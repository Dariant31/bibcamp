from typing import List

from typing_extensions import Literal

from pydantic.fields import Optional
from pydantic.main import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from Api.dtos.transaction import transaction_dto, TransactionOutputDto
from Api.models.book import Books
from Api.models.transaction import TransactionStatusEnum

book_dto = pydantic_model_creator(Books, name="Book")
book_dto_input = pydantic_model_creator(Books, name="BookInput", exclude_readonly=True)


class bookSearchDTO(BaseModel):
    type: Literal["ISBN", "TITLE"]
    value: str


class bookSearchResponse(BaseModel):
    isInLocalDb: bool
    isInNet: bool
    bookInDB: Optional[book_dto]
    bookInNet: Optional[book_dto_input]


class bookDetailsResponse(BaseModel):
    book: book_dto
    transaction: List[TransactionOutputDto]
    isBorrowed: bool


class borrowBookInput(BaseModel):
    book_id: int
    user_id: int
    fromUNIX: int
    untilUNIX: int
    status: str
