from fastapi import APIRouter, Depends
from database.mongodb import tools, reviews
from core.dependencies import admin_only
from services.tool_service import recalculate_rating
from utils.enums import ReviewStatus

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/tools")
def add_tool(tool: dict, admin=Depends(admin_only)):
    tools.insert_one({**tool, "avg_rating": 0})
    return {"message": "Tool added"}

@router.delete("/tools/{tool_id}")
def delete_tool(tool_id: str, admin=Depends(admin_only)):
    tools.delete_one({"_id": tool_id})
    return {"message": "Tool deleted"}

@router.post("/reviews/{review_id}/approve")
def approve_review(review_id: str, admin=Depends(admin_only)):
    review = reviews.find_one({"_id": review_id})
    reviews.update_one({"_id": review_id}, {"$set": {"status": ReviewStatus.APPROVED}})
    recalculate_rating(review["tool_id"])
    return {"message": "Review approved"}

@router.post("/reviews/{review_id}/reject")
def reject_review(review_id: str, admin=Depends(admin_only)):
    reviews.update_one({"_id": review_id}, {"$set": {"status": ReviewStatus.REJECTED}})
    return {"message": "Review rejected"}
