from fastapi import APIRouter, Depends
from schemas.review_schema import ReviewCreate
from core.dependencies import get_current_user
from services.review_service import create_review

router = APIRouter(prefix="/reviews", tags=["Reviews"])

@router.post("")
def submit_review(review: ReviewCreate, user=Depends(get_current_user)):
    create_review(
        review.tool_id,
        user["email"],
        review.rating,
        review.comment
    )
    return {"message": "Review submitted for approval"}
