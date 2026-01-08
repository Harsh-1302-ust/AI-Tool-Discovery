from pydantic import BaseModel

class ToolCreate(BaseModel):
    name: str
    use_case: str
    category: str
    pricing: str
