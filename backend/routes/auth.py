from fastapi import APIRouter
from pydantic import BaseModel
import os

router = APIRouter(prefix="/auth", tags=["auth"])


class PasswordVerify(BaseModel):
    password: str


@router.post("/verify-site")
async def verify_site_password(body: PasswordVerify):
    return {"valid": body.password == os.environ['SITE_PASSWORD']}


@router.post("/verify-admin")
async def verify_admin_password(body: PasswordVerify):
    return {"valid": body.password == os.environ['ADMIN_PASSWORD']}
