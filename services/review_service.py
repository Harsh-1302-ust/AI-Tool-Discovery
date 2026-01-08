from database.mongodb import reviews
from utils.enums import ReviewStatus

def create_review(tool_id, user_email, rating, comment):
    reviews.insert_one({
        "tool_id": tool_id,
        "user_email": user_email,
        "rating": rating,
        "comment": comment,
        "status": ReviewStatus.PENDING
    })
