from fastapi import HTTPException
from core.database import reviews_collection, tools_collection
from models.review_model import create_review_document, review_dict

def submit_review(tool_id: int, user_id: int, rating: int, comment: str | None = None) -> dict:
    """
    Submit a review for a tool (starts as PENDING)
    """
    if rating < 1 or rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    # Check tool exists
    tool = tools_collection.find_one({"id": tool_id})
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    review_doc = create_review_document(tool_id, user_id, rating, comment)
    reviews_collection.insert_one(review_doc)
    return review_dict(review_doc)

def approve_review(review_id: int) -> dict:
    """
    Approve a pending review and update tool rating
    """
    review = reviews_collection.find_one({"id": review_id})
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    if review["status"] == "APPROVED":
        return {"message": "Review already approved"}

    # Update review status
    reviews_collection.update_one({"id": review_id}, {"$set": {"status": "APPROVED"}})

    # Update tool rating
    tool = tools_collection.find_one({"id": review["tool_id"]})
    new_count = tool.get("rating_count", 0) + 1
    new_avg = (tool.get("average_rating", 0) * tool.get("rating_count", 0) + review["rating"]) / new_count

    tools_collection.update_one(
        {"id": tool["id"]},
        {"$set": {
            "average_rating": round(new_avg, 2),
            "rating_count": new_count
        }}
    )

    return {"message": "Review approved and tool rating updated"}

def reject_review(review_id: int) -> dict:
    """
    Reject a pending review
    """
    review = reviews_collection.find_one({"id": review_id})
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    reviews_collection.update_one({"id": review_id}, {"$set": {"status": "REJECTED"}})
    return {"message": "Review rejected"}

def get_reviews(tool_id: int = None, status: str = None) -> list:
    """
    Fetch reviews with optional filters
    """
    query = {}
    if tool_id is not None:
        query["tool_id"] = tool_id
    if status:
        query["status"] = status.upper()

    reviews = list(reviews_collection.find(query, {"_id": 0}))
    return [review_dict(r) for r in reviews]
