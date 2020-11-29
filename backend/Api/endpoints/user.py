from fastapi import APIRouter

from Api.dtos.user import user_dto, user_dto_input
from Api.models.user import Users

router = APIRouter()


@router.get("/{user_sub}")
async def getUsers(user_sub: str):
    return await user_dto.from_queryset_single(Users.get(sub=user_sub))


# @router.put("/{user_id}")
# async def putUser(user_id: int, user: user_dto_input):
#     await Users.filter(id=user_id).update(**user.dict())
#     return await user_dto.from_queryset_single(Users.get(id=user_id))


async def postUser(user: user_dto_input):
    user_obj = await Users.create(**user.dict())
    return await user_dto.from_tortoise_orm(user_obj)
