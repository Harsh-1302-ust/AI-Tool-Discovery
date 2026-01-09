from core.database import users_collection
from core.security import hash_password, verify_password, create_access_token
from models.user_model import create_user, user_dict
from fastapi import HTTPException

def register_user(username: str, password: str):
    if users_collection.find_one({"username": username}):
        raise HTTPException(400, "User already exists")

    # 👇 FORCE USER ROLE
    user = create_user(
        username=username,
        password=hash_password(password),
        role="user"
    )

    users_collection.insert_one(user)
    return user_dict(user)

def login_user(username: str, password: str):
    user = users_collection.find_one({"username": username})
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_access_token({
        "sub": user["username"],
        "user_id": user["id"],
        "role": user["role"]
    })

    return {"access_token": token, "token_type": "bearer"}
