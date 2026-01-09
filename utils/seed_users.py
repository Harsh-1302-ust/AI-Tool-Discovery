from core.database import users_collection
from core.security import hash_password
from models.user_model import create_user_document

admins = [
    {"username": "admin1", "password": "admin123", "role": "admin"},
    {"username": "admin2", "password": "admin123", "role": "admin"},
    {"username": "admin3", "password": "admin123", "role": "admin"},
]

users = [
    {"username": "user1", "password": "user123", "role": "user"},
    {"username": "user2", "password": "user123", "role": "user"},
    {"username": "user3", "password": "user123", "role": "user"},
    {"username": "user4", "password": "user123", "role": "user"},
]

def seed_collection(data_list):
    for u in data_list:
        if users_collection.find_one({"username": u["username"]}):
            continue
        user_doc = create_user_document(
            username=u["username"],
            hashed_password=hash_password(u["password"]),
            role=u["role"]
        )
        users_collection.insert_one(user_doc)

if __name__ == "__main__":
    seed_collection(admins)
    seed_collection(users)
    print("Users seeded ")
