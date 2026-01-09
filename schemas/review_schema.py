from pydantic import BaseModel
from typing import Optional

class ReviewCreate(BaseModel):
    tool_id: int
    rating: int
    comment: Optional[str] = None
