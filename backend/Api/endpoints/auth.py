from datetime import timedelta

from fastapi import APIRouter, HTTPException

from Api.configs.secrets import ACCESS_TOKEN_EXPIRE_MINUTES
from Api.endpoints.user import postUser
from Api.services.auth import AuthServices
from Api.dtos.auth import *
from Api.dtos.book import *
from Api.dtos.transaction import *
from Api.dtos.user import *

router = APIRouter()
authService = AuthServices()


@router.post("/register_user")
async def register_user(user: registerDto):
    userComplete = user_dto_input.parse_obj({
        'name': user.name,
        'email': user.email,
        'isAdmin': False,
        'hashed_password': authService.get_hashed_password(user.password),
    })
    await postUser(userComplete)


@router.post("/login")
async def login(logindto: loginDto):
    user = await authService.authenticate_user(logindto)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return authService.create_access_token(
        data={"user": user.dict()}, expires_delta=access_token_expires
    )


# this endpoint is fake, just so the openapi.json contain all necessary DTOs
@router.post("/fakeEndPoint")
async def fakeEP(
        loginDto: loginDto,
        registerDto: registerDto,
        Token: Token,
        TokenData: TokenData,
        transaction_dto: transaction_dto,
        TransactionOutputDto: TransactionOutputDto,
        TransactionStatusEnum: TransactionStatusEnum,
        book_dto: book_dto,
        book_dto_input: book_dto_input,
        bookSearchDTO: bookSearchDTO,
        bookSearchResponse: bookSearchResponse,
        bookDetailsResponse: bookDetailsResponse,
        borrowBookInput: borrowBookInput,
        transaction_dto_input: transaction_dto_input,
        user_dto: user_dto,
        user_dto_input: user_dto_input
):
    return None
