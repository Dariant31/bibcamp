import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise

from Api.configs.secrets import populate_secrets, SWAGGER_DOCS_URL
from Api.configs.tortoise import TORTOISE_ORM
from Api.endpoints import book, user, auth
from Api.services.auth import AuthServices

authServices = AuthServices()

app = FastAPI(
    title="bibcamp API",
    description="this is the backend for bibcamp application",
    version="0.0.1",
    redoc_url=None,
    docs_url=SWAGGER_DOCS_URL
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    book.router,
    prefix="/books",
    tags=["Books"],
    dependencies=[Depends(authServices.get_current_user)]
)

app.include_router(
    user.router,
    prefix="/users",
    tags=["Users"]
)

app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Auth"]
)

register_tortoise(
    app,
    config=TORTOISE_ORM
)

if __name__ == "__main__":
    populate_secrets()
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
