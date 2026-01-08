from fastapi import APIRouter, HTTPException
from schemas.user_schema import UserCreate, TokenResponse
from services.auth_service import register_user, authenticate_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: UserCreate):
    register_user(user.email, user.password)
    return {"message": "User registered successfully"}

@router.post("/login", response_model=TokenResponse)
def login(user: UserCreate):
    token = authenticate_user(user.email, user.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token}
