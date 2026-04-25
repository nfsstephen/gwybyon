"""
Crew Management — Authentication
JWT + bcrypt, multi-tenant. JWT payload contains user_id, client_id, role.
Every authenticated route MUST use get_cm_user to enforce tenant isolation.
"""
import os
import jwt
import bcrypt
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from database import supabase

router = APIRouter(prefix="/cm/auth", tags=["cm-auth"])
security = HTTPBearer()

JWT_SECRET = os.environ.get("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24


# ----- Models -----
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    token: str
    user: dict


# ----- Helpers -----
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))


def create_token(user_id: str, client_id: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "client_id": client_id,
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


def get_cm_user(creds: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    FastAPI dependency. Extracts user from JWT and returns:
        { user_id, client_id, role, email, full_name }
    Use this on every CM route to enforce tenant isolation.
    """
    payload = decode_token(creds.credentials)
    user_id = payload.get("sub")
    client_id = payload.get("client_id")
    role = payload.get("role")
    if not user_id or not client_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    res = (
        supabase.table("cm_users")
        .select("id, client_id, email, full_name, role, is_active")
        .eq("id", user_id)
        .eq("client_id", client_id)
        .limit(1)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=401, detail="User not found")
    user = res.data[0]
    if not user.get("is_active"):
        raise HTTPException(status_code=403, detail="User is inactive")
    return {
        "user_id": user["id"],
        "client_id": user["client_id"],
        "role": user["role"],
        "email": user["email"],
        "full_name": user["full_name"],
    }


def require_role(*allowed_roles: str):
    """Dependency factory: require user to have one of the given roles."""
    def checker(user: dict = Depends(get_cm_user)) -> dict:
        if user["role"] not in allowed_roles:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return checker


# ----- Routes -----
@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest):
    email = req.email.lower().strip()
    res = (
        supabase.table("cm_users")
        .select("id, client_id, email, password_hash, full_name, role, is_active")
        .eq("email", email)
        .limit(1)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    user = res.data[0]
    if not user.get("is_active"):
        raise HTTPException(status_code=403, detail="User is inactive")
    if not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Update last_login_at (best-effort)
    try:
        supabase.table("cm_users").update(
            {"last_login_at": datetime.now(timezone.utc).isoformat()}
        ).eq("id", user["id"]).execute()
    except Exception:
        pass

    # Fetch client business name for UI
    client_res = (
        supabase.table("cm_clients")
        .select("id, business_name, public_slug, timezone")
        .eq("id", user["client_id"])
        .limit(1)
        .execute()
    )
    client = client_res.data[0] if client_res.data else {}

    token = create_token(user["id"], user["client_id"], user["role"])
    return TokenResponse(
        token=token,
        user={
            "id": user["id"],
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user["role"],
            "client": {
                "id": client.get("id"),
                "business_name": client.get("business_name"),
                "public_slug": client.get("public_slug"),
                "timezone": client.get("timezone"),
            },
        },
    )


@router.get("/me")
def me(user: dict = Depends(get_cm_user)):
    client_res = (
        supabase.table("cm_clients")
        .select("id, business_name, public_slug, timezone")
        .eq("id", user["client_id"])
        .limit(1)
        .execute()
    )
    client = client_res.data[0] if client_res.data else {}
    return {
        "id": user["user_id"],
        "email": user["email"],
        "full_name": user["full_name"],
        "role": user["role"],
        "client": client,
    }
