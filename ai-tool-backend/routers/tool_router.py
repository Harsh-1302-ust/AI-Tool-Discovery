from fastapi import APIRouter, Depends, Query
from core.database import tools_collection
from core.security import user_only

router = APIRouter(
    prefix="/tools",
    tags=["Tools"]
)

@router.get(
    "",
    dependencies=[Depends(user_only)],
    # security=[{"HTTPBearer": []}]
)
def get_tools(
    category: str | None = Query(default=None),
    pricing: str | None = Query(default=None),
    min_rating: float | None = Query(default=None)
):
    query = {}

    if category:
        query["category"] = category

    if pricing:
        query["pricing"] = pricing

    tools = list(tools_collection.find(query, {"_id": 0}))

    if min_rating is not None:
        tools = [t for t in tools if t.get("average_rating", 0) >= min_rating]

    return tools
