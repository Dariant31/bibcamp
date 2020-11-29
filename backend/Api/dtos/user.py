from tortoise.contrib.pydantic import pydantic_model_creator

from Api.models.user import Users

user_dto = pydantic_model_creator(Users, name="User")
user_dto_input = pydantic_model_creator(Users, name="UserInput", exclude_readonly=True)
