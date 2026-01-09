from core.database import tools_collection
from models.tool_model import create_tool_document

tools = [
    {"name": "ChatGPT", "use_case": "Text generation", "category": "NLP", "pricing": "Free"},
    {"name": "DALL-E", "use_case": "Image generation", "category": "Computer Vision", "pricing": "Subscription"},
    {"name": "Grammarly", "use_case": "Writing assistant", "category": "Dev Tools", "pricing": "Paid"},
    {"name": "TensorFlow", "use_case": "Machine Learning", "category": "Dev Tools", "pricing": "Free"},
    {"name": "MidJourney", "use_case": "AI Art generation", "category": "Computer Vision", "pricing": "Subscription"},
]

def seed_tools():
    for t in tools:
        if tools_collection.find_one({"name": t["name"]}):
            continue
        tool_doc = create_tool_document(t["name"], t["use_case"], t["category"], t["pricing"])
        tools_collection.insert_one(tool_doc)

if __name__ == "__main__":
    seed_tools()
    print("Tools seeded ")
