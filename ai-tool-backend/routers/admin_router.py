from fastapi import APIRouter, Depends, HTTPException
from core.database import tools_collection, reviews_collection
from models.counter_model import get_next_id
from core.security import admin_only

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

# -------------------------------
# ADD TOOL (ADMIN ONLY)
# -------------------------------
@router.post(
    "/tool",
    dependencies=[Depends(admin_only)],
    # security=[{"HTTPBearer": []}]
)
def add_tool(tool: dict):
    tool["id"] = get_next_id("tools")
    tool["average_rating"] = 0
    tool["rating_count"] = 0

    tools_collection.insert_one(tool)
    return {"message": "Tool added successfully"}


# -------------------------------
# APPROVE REVIEW (ADMIN ONLY)
# -------------------------------
@router.post(
    "/review/{review_id}/approve",
    dependencies=[Depends(admin_only)],
    # security=[{"HTTPBearer": []}]
)
def approve_review(review_id: int):
    review = reviews_collection.find_one({"id": review_id})

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    if review["status"] == "APPROVED":
        return {"message": "Review already approved"}

    # Mark review as approved
    reviews_collection.update_one(
        {"id": review_id},
        {"$set": {"status": "APPROVED"}}
    )

    # Update tool rating
    tool = tools_collection.find_one({"id": review["tool_id"]})

    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    new_count = tool.get("rating_count", 0) + 1
    new_avg = (
        (tool.get("average_rating", 0) * tool.get("rating_count", 0))
        + review["rating"]
    ) / new_count

    tools_collection.update_one(
        {"id": tool["id"]},
        {
            "$set": {
                "average_rating": round(new_avg, 2),
                "rating_count": new_count
            }
        }
    )

    return {
        "message": "Review approved and tool rating updated",
        "average_rating": round(new_avg, 2)
    }
