from database.mongodb import tools, reviews

def recalculate_rating(tool_id):
    approved_reviews = reviews.find({"tool_id": tool_id, "status": "APPROVED"})
    ratings = [r["rating"] for r in approved_reviews]

    avg = sum(ratings) / len(ratings) if ratings else 0
    tools.update_one({"_id": tool_id}, {"$set": {"avg_rating": round(avg, 2)}})
