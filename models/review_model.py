from typing import Optional
from models.counter_model import get_next_id

def create_review_document(tool_id: int, user_id: int, rating: int, comment: Optional[str] = None):
    """
    Returns a dict to insert into MongoDB
    """
    return {
        "id": get_next_id("reviews"),  # Auto-increment ID
        "tool_id": tool_id,
        "user_id": user_id,
        "rating": rating,              # 1-5
        "comment": comment or "",
        "status": "PENDING"            # PENDING | APPROVED | REJECTED
    }

def review_dict(review: dict):
    """
    Safe dict for API response
    """
    return {
        "id": review["id"],
        "tool_id": review["tool_id"],
        "user_id": review["user_id"],
        "rating": review["rating"],
        "comment": review.get("comment", ""),
        "status": review["status"]
    }
