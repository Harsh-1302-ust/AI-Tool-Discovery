from pymongo import MongoClient
from core.config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

users = db.users
tools = db.tools
reviews = db.reviews
