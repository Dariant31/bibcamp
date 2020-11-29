from pydantic.main import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from Api.models.transaction import Transactions

transaction_dto = pydantic_model_creator(Transactions, name="Transaction")
transaction_dto_input = pydantic_model_creator(Transactions, name="Transaction Input", exclude_readonly=True)


class TransactionOutputDto(BaseModel):
    name: str
    fromUNIX: int
    untilUNIX: int
    status: str
