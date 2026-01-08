from pydantic import BaseModel

class ReviewCreate(BaseModel):
    tool_id: str
    rating: int
    comment: str | None = None
