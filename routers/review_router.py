from fastapi import APIRouter, Depends, HTTPException
from core.database import tools_collection, reviews_collection
from models.counter_model import get_next_id
from core.security import admin_only

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

# ======================================================
# ADD TOOL
# ======================================================
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


# ======================================================
# UPDATE TOOL
# ======================================================
@router.put(
    "/tool/{tool_id}",
    dependencies=[Depends(admin_only)],
    # security=[{"HTTPBearer": []}]
)
def update_tool(tool_id: int, updates: dict):
    tool = tools_collection.find_one({"id": tool_id})
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    # Prevent changing system fields
    updates.pop("id", None)
    updates.pop("average_rating", None)
    updates.pop("rating_count", None)

    tools_collection.update_one(
        {"id": tool_id},
        {"$set": updates}
    )

    return {"message": "Tool updated successfully"}


# ======================================================
# DELETE TOOL
# ======================================================
@router.delete(
    "/tool/{tool_id}",
    dependencies=[Depends(admin_only)],
    # security=[{"HTTPBearer": []}]
)
def delete_tool(tool_id: int):
    tool = tools_collection.find_one({"id": tool_id})
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    tools_collection.delete_one({"id": tool_id})
    reviews_collection.delete_many({"tool_id": tool_id})

    return {"message": "Tool and related reviews deleted successfully"}


# ======================================================
# APPROVE REVIEW
# ======================================================
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

    # Approve review
    reviews_collection.update_one(
        {"id": review_id},
        {"$set": {"status": "APPROVED"}}
    )

    tool = tools_collection.find_one({"id": review["tool_id"]})
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    old_count = tool.get("rating_count", 0)
    old_avg = tool.get("average_rating", 0)

    new_count = old_count + 1
    new_avg = ((old_avg * old_count) + review["rating"]) / new_count

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
        "message": "Review approved",
        "average_rating": round(new_avg, 2)
    }


# ======================================================
# REJECT REVIEW
# ======================================================
@router.post(
    "/review/{review_id}/reject",
    dependencies=[Depends(admin_only)],
    # security=[{"HTTPBearer": []}]
)
def reject_review(review_id: int):
    review = reviews_collection.find_one({"id": review_id})
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    if review["status"] == "REJECTED":
        return {"message": "Review already rejected"}

    reviews_collection.update_one(
        {"id": review_id},
        {"$set": {"status": "REJECTED"}}
    )

    return {"message": "Review rejected successfully"}
