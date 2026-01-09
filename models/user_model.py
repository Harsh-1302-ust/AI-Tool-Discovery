from datetime import datetime
from models.counter_model import get_next_id

def create_user_document(username: str, hashed_password: str, role: str):
    return {
        "id": get_next_id("users"),
        "username": username,
        "password": hashed_password,
        "role": role
    }

def user_dict(email: str, hashed_password: str):
    return {
        "email": email,
        "password": hashed_password,
        "role": "USER",          # FORCE default role
        "created_at": datetime.utcnow()
    }

def create_user(username, password, role):
    return {
        "id": get_next_id("users"),
        "username": username,
        "password": password,
        "role": role
    }