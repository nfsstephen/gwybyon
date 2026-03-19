import os
import jwt
import bcrypt
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from database import db

router = APIRouter(prefix="/dashboard/auth", tags=["dashboard-auth"])
security = HTTPBearer()

JWT_SECRET = os.environ.get('JWT_SECRET')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "client"


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))


def create_token(user_id: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    payload = decode_token(credentials.credentials)
    user = await db.dashboard_users.find_one(
        {"id": payload["sub"]}, {"_id": 0}
    )
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def require_role(*roles):
    async def role_checker(user: dict = Depends(get_current_user)):
        if user.get("role") not in roles:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return role_checker


def user_to_dict(user: dict) -> dict:
    return {
        "id": user["id"],
        "email": user["email"],
        "full_name": user["full_name"],
        "role": user["role"],
        "is_active": user.get("is_active", True),
        "created_at": user.get("created_at"),
    }


@router.post("/register")
async def register(req: RegisterRequest):
    existing = await db.dashboard_users.find_one({"email": req.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    if req.role not in ("admin", "client", "technical"):
        raise HTTPException(status_code=400, detail="Invalid role")

    import uuid
    user = {
        "id": str(uuid.uuid4()),
        "email": req.email,
        "password_hash": hash_password(req.password),
        "full_name": req.full_name,
        "role": req.role,
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.dashboard_users.insert_one(user)

    token = create_token(user["id"], user["role"])
    return {"token": token, "user": user_to_dict(user)}


@router.post("/login")
async def login(req: LoginRequest):
    user = await db.dashboard_users.find_one({"email": req.email})
    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token(user["id"], user["role"])
    return {"token": token, "user": user_to_dict(user)}


@router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    return user_to_dict(user)
