from fastapi import APIRouter
from database.mongodb import tools

router = APIRouter(prefix="/tools", tags=["Tools"])

@router.get("")
def get_tools(category: str = None, pricing: str = None, min_rating: float = None):
    query = {}

    if category:
        query["category"] = category
    if pricing:
        query["pricing"] = pricing
    if min_rating:
        query["avg_rating"] = {"$gte": min_rating}

    return list(tools.find(query, {"_id": 0}))
