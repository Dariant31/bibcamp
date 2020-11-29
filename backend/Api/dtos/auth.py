from pydantic import BaseModel


class loginDto(BaseModel):
    email: str
    password: str


class registerDto(loginDto):
    name: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str = None
