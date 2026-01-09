from typing import List, Optional
from core.database import tools_collection, reviews_collection
from models.tool_model import create_tool_document, tool_dict

def add_tool(name: str, use_case: str, category: str, pricing: str) -> dict:
    """
    Add a new tool to the database
    """
    tool_doc = create_tool_document(name, use_case, category, pricing)
    tools_collection.insert_one(tool_doc)
    return tool_dict(tool_doc)

def get_tools(category: Optional[str] = None,
              pricing: Optional[str] = None,
              min_rating: Optional[float] = None) -> List[dict]:
    """
    Fetch tools with optional filters
    """
    query = {}
    if category:
        query["category"] = category
    if pricing:
        query["pricing"] = pricing

    tools = list(tools_collection.find(query, {"_id": 0}))

    # Filter by minimum rating
    if min_rating is not None:
        tools = [t for t in tools if t.get("average_rating", 0) >= min_rating]

    return [tool_dict(t) for t in tools]

def get_tool_by_id(tool_id: int) -> Optional[dict]:
    """
    Fetch a single tool
    """
    tool = tools_collection.find_one({"id": tool_id}, {"_id": 0})
    if tool:
        return tool_dict(tool)
    return None

def delete_tool(tool_id: int) -> dict:
    """
    Delete a tool and all its reviews
    """
    tools_collection.delete_one({"id": tool_id})
    reviews_collection.delete_many({"tool_id": tool_id})
    return {"message": "Tool and related reviews deleted successfully"}
