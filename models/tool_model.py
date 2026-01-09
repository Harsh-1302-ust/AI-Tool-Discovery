from models.counter_model import get_next_id

def create_tool_document(name: str, use_case: str, category: str, pricing: str):
    """
    Returns a dict to insert into MongoDB
    """
    return {
        "id": get_next_id("tools"),   # Auto-increment ID
        "name": name,
        "use_case": use_case,
        "category": category,
        "pricing": pricing,           # Free / Paid / Subscription
        "average_rating": 0.0,        # Starts with 0
        "rating_count": 0             # Number of approved ratings
    }

def tool_dict(tool: dict):
    """
    Returns a safe dict for API response (hide internal fields if needed)
    """
    return {
        "id": tool["id"],
        "name": tool["name"],
        "use_case": tool["use_case"],
        "category": tool["category"],
        "pricing": tool["pricing"],
        "average_rating": tool.get("average_rating", 0),
        "rating_count": tool.get("rating_count", 0)
    }
