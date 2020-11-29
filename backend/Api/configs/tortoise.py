from Api.configs.secrets import DATABASE_URL

TORTOISE_ORM = {
    "connections": {
        "default": DATABASE_URL
    },
    "apps": {
        "models": {
            "models": ["Api.models.__models__", "aerich.models"],
            "default_connection": "default",
        },
    },
    "generate_schemas": "True"
}
