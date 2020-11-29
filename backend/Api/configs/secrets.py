# function to populate secrets data
import os

from dotenv import load_dotenv


def populate_secrets():
    load_dotenv()

# Database Secrets
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_TABLE = os.getenv("DATABASE_TABLE")
DATABASE_URL = f"mysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_TABLE}"

# Swagger docs on/off
SWAGGER_DOCS_URL = os.getenv("SWAGGER_DOCS_URL")

# Allowed CORS Origin
ALLOWED_CORS_ORIGIN = os.getenv("ALLOWED_CORS_ORIGIN")

# Auth Secrets
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 1000
