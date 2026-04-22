from fastapi import APIRouter
from pydantic import BaseModel
import os

router = APIRouter(prefix="/auth", tags=["auth"])


class PasswordVerify(BaseModel):
    password: str


@router.post("/verify-site")
async def verify_site_password(body: PasswordVerify):
    site_pw = os.environ.get('SITE_PASSWORD')
    if not site_pw:
        return {"valid": False, "error": "SITE_PASSWORD not configured"}
    return {"valid": body.password == site_pw}


@router.post("/verify-admin")
async def verify_admin_password(body: PasswordVerify):
    admin_pw = os.environ.get('ADMIN_PASSWORD')
    if not admin_pw:
        return {"valid": False, "error": "ADMIN_PASSWORD not configured"}
    return {"valid": body.password == admin_pw}
