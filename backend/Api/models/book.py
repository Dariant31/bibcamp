from tortoise import fields, models


class Books(models.Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=100)
    isbn = fields.CharField(max_length=15)
    author = fields.CharField(max_length=100)
    language = fields.CharField(max_length=100)
    genre = fields.CharField(max_length=300)
    desc = fields.TextField(max_length=999999)
    publisher = fields.CharField(max_length=100)
    coverUrl = fields.CharField(max_length=300)
