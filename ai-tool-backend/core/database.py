from pymongo import MongoClient
from core.config import settings

client = MongoClient(settings.MONGO_URI)
db = client[settings.DB_NAME]

users_collection = db.users
tools_collection = db.tools
reviews_collection = db.reviews
counter_collection = db.counters
