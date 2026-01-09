from core.database import reviews_collection, users_collection, tools_collection
from models.review_model import create_review_document
from models.counter_model import get_next_id

# Example reviews
reviews = [
    {"tool_name": "ChatGPT", "username": "user1", "rating": 5, "comment": "Excellent!", "status": "APPROVED"},
    {"tool_name": "ChatGPT", "username": "user2", "rating": 4, "comment": "Very good", "status": "PENDING"},
    {"tool_name": "DALL-E", "username": "user1", "rating": 5, "comment": "Amazing images", "status": "APPROVED"},
    {"tool_name": "Grammarly", "username": "user3", "rating": 3, "comment": "Useful but limited", "status": "PENDING"},
    {"tool_name": "MidJourney", "username": "user4", "rating": 4, "comment": "Creative AI tool", "status": "APPROVED"},
]

def seed_reviews():
    for r in reviews:
        # Fetch tool_id
        tool = tools_collection.find_one({"name": r["tool_name"]})
        if not tool:
            continue
        # Fetch user_id
        user = users_collection.find_one({"username": r["username"]})
        if not user:
            continue
        # Skip if same review exists
        if reviews_collection.find_one({"tool_id": tool["id"], "user_id": user["id"]}):
            continue

        review_doc = create_review_document(tool["id"], user["id"], r["rating"], r["comment"])
        # Set status manually if different from default
        review_doc["status"] = r["status"]
        reviews_collection.insert_one(review_doc)

        # If APPROVED, update tool average rating
        if r["status"] == "APPROVED":
            new_count = tool.get("rating_count", 0) + 1
            new_avg = (tool.get("average_rating", 0) * tool.get("rating_count", 0) + r["rating"]) / new_count
            tools_collection.update_one({"id": tool["id"]}, {"$set": {"average_rating": round(new_avg, 2), "rating_count": new_count}})

if __name__ == "__main__":
    seed_reviews()
    print("Reviews seeded ")
