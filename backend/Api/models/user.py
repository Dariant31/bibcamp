from tortoise import fields, models


class Users(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=100)
    isAdmin = fields.BooleanField(default=False)
    hashed_password = fields.CharField(max_length=300)
