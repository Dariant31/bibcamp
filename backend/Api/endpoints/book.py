import logging
from typing import List

from fastapi import APIRouter, HTTPException, Depends

from Api.dtos.book import book_dto, book_dto_input, bookSearchResponse, bookSearchDTO, bookDetailsResponse, \
    borrowBookInput
from Api.dtos.transaction import transaction_dto, transaction_dto_input, TransactionOutputDto
from Api.dtos.user import user_dto
from Api.models.book import Books
from Api.models.transaction import Transactions, TransactionStatusEnum
from Api.models.user import Users
from Api.services.auth import AuthServices
from Api.services.bookScrapper import BookScrapper

router = APIRouter()
authServices = AuthServices()


@router.get("/")
async def getBooks():
    return await book_dto.from_queryset(Books.all())


@router.get("/{book_id}")
async def getBookDetail(book_id: int) -> bookDetailsResponse:
    try:
        bookObj = await book_dto.from_queryset_single(Books.get(id=book_id))
        transactionAllList = await transaction_dto.from_queryset(Transactions.filter(bookId=book_id))
        transactionOngoinglist = list(
            filter(lambda x: x.status == TransactionStatusEnum.ONGOING.name, transactionAllList)
        )
        responseObj = bookDetailsResponse.parse_obj({
            "book": bookObj,
            "transaction": await getTransactionOutputDTO(transactionAllList),
            "isBorrowed": len(transactionOngoinglist) is not 0
        })
    except:
        raise HTTPException(status_code=500, detail="Oops something went wrong")
    return responseObj


@router.post("/search")
async def searchBook(booksearchdto: bookSearchDTO):
    bookScrapper = BookScrapper(value=booksearchdto.value, type=booksearchdto.type)
    response = bookSearchResponse.parse_obj({
        "isInLocalDb": False,
        "isInNet": False,
        "bookInDB": None,
        "bookInNet": None
    })

    # search in db
    if (booksearchdto.type == "ISBN"):
        query = Books.get_or_none(isbn=booksearchdto.value)
    else:
        query = Books.get_or_none(title__icontains=booksearchdto.value)

    try:
        bookindb = await book_dto.from_queryset_single(query)
    except:
        bookindb = None

    if bookindb is not None:
        logging.debug('search use BibsurferDB')
        response.isInLocalDb = True
        response.bookInDB = bookindb
        return response

    # if not found, search in googleBook
    bookinnet = bookScrapper.getFromGoogle()

    if bookinnet is not None:
        logging.debug('search use GoogleBooksAPI')
        response.isInNet = True
        response.bookInNet = bookinnet
        return response

    # if not found, search in goodreads
    bookinnet = bookScrapper.getFromGoodreads()

    if bookinnet is not None:
        logging.debug('search use GoodreadsScrapper')
        response.isInNet = True
        response.bookInNet = bookinnet
        return response

    # if not found, return not found
    response.isInLocalDb = False
    response.isInNet = False
    return response


@router.post("/")
async def addBook(book: book_dto_input):
    book_obj = await Books.create(**book.dict())
    return await book_dto.from_tortoise_orm(book_obj)


@router.post("/borrow")
async def borrowBook(borrow_obj: borrowBookInput):
    trans_obj = transaction_dto_input.parse_obj({
        "userId": borrow_obj.user_id,
        "bookId": borrow_obj.book_id,
        "fromUNIX": borrow_obj.fromUNIX,
        "untilUNIX": borrow_obj.untilUNIX,
        "status": borrow_obj.status
    })
    borrow_obj_res = await Transactions.create(**trans_obj.dict())
    return await transaction_dto.from_tortoise_orm(borrow_obj_res)


async def getTransactionOutputDTO(rawList: List[transaction_dto]) -> List[TransactionOutputDto]:
    responseList: List[TransactionOutputDto] = []
    for item in rawList:
        user = await user_dto.from_queryset_single(Users.get(id=item.userId))
        transOutObj: TransactionOutputDto = TransactionOutputDto.parse_obj({
            "name": user.name,
            "fromUNIX": item.fromUNIX,
            "untilUNIX": item.untilUNIX,
            "status": item.status
        })
        responseList.append(transOutObj)
    return responseList
