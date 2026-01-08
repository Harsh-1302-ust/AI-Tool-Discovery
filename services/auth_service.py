from database.mongodb import users
from core.security import hash_password, verify_password, create_access_token
from utils.enums import Role

def register_user(email, password):
    users.insert_one({
        "email": email,
        "password": hash_password(password),
        "role": Role.USER
    })

def authenticate_user(email, password):
    user = users.find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        return None
    return create_access_token({"email": user["email"], "role": user["role"]})
