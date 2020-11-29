from datetime import datetime, timedelta
from typing import Optional

import jwt
from fastapi import Depends, HTTPException
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security import HTTPBearer
from fastapi.security.base import SecurityBase
from fastapi.security.utils import get_authorization_scheme_param
from jwt import PyJWTError
from passlib.context import CryptContext
from passlib.hash import bcrypt
from starlette.requests import Request
from starlette.status import HTTP_403_FORBIDDEN
from passlib.hash import pbkdf2_sha256
from Api.configs.secrets import SECRET_KEY, ALGORITHM
from Api.dtos.auth import TokenData, loginDto
from Api.dtos.user import user_dto
from Api.models.user import Users


class OAuth2PasswordBearerCookie(HTTPBearer):
    def __init__(
            self,
            tokenUrl: str,
            scheme_name: str = None,
            scopes: dict = None,
            auto_error: bool = True,
    ):
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password={"tokenUrl": tokenUrl, "scopes": scopes})
        super().__init__(scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[str]:
        header_authorization: str = request.headers.get("Authorization")
        cookie_authorization: str = request.cookies.get("Authorization")

        header_scheme, header_param = get_authorization_scheme_param(
            header_authorization
        )
        cookie_scheme, cookie_param = get_authorization_scheme_param(
            cookie_authorization
        )

        if header_scheme.lower() == "bearer":
            authorization = True
            scheme = header_scheme
            param = header_param

        elif cookie_scheme.lower() == "bearer":
            authorization = True
            scheme = cookie_scheme
            param = cookie_param

        else:
            authorization = False

        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=HTTP_403_FORBIDDEN, detail="Not authenticated"
                )
            else:
                return None
        return param


class BasicAuth(SecurityBase):
    def __init__(self, scheme_name: str = None, auto_error: bool = True):
        self.scheme_name = scheme_name or self.__class__.__name__
        self.auto_error = auto_error

    async def __call__(self, request: Request) -> Optional[str]:
        authorization: str = request.headers.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "basic":
            if self.auto_error:
                raise HTTPException(
                    status_code=HTTP_403_FORBIDDEN, detail="Not authenticated"
                )
            else:
                return None
        return param


class AuthServices():
    oauth2_scheme = OAuth2PasswordBearerCookie(tokenUrl="/token")

    def get_hashed_password(self, plain_text_password: str):
        return pbkdf2_sha256.hash(plain_text_password)

    def verify_password(self, plain_password, hashed_password):
        return pbkdf2_sha256.verify(plain_password, hashed_password)

    async def get_user(self, email: str):
        try:
            user = await user_dto.from_queryset_single(Users.get(email=email))
            return user
        except:
            raise HTTPException(status_code=404, detail=f"user {email} not found")

    async def authenticate_user(self, logindto: loginDto):
        user = await self.get_user(logindto.email)
        if not user:
            return False
        if not self.verify_password(logindto.password, user.hashed_password):
            return False
        return user

    def create_access_token(self, *, data: dict, expires_delta: timedelta = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    async def get_current_user(self, token: str = Depends(oauth2_scheme)) -> user_dto:
        credentials_exception = HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials"
        )
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload["user"]["email"]
            if username is None:
                raise credentials_exception
            token_data = TokenData(email=username)
        except PyJWTError:
            raise credentials_exception
        user = await self.get_user(email=token_data.email)
        if user is None:
            raise credentials_exception
        return user
