from enum import Enum

from tortoise import fields, models

class TransactionStatusEnum(Enum):
    COMPLETED = 1
    ONGOING = 2
    OVERDUE = 3


class Transactions(models.Model):
    id = fields.IntField(pk=True)
    userId = fields.IntField()
    bookId = fields.IntField()
    fromUNIX = fields.IntField()
    untilUNIX = fields.IntField()
    status = fields.CharField(max_length=100, default=None)
