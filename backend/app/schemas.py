from pydantic import BaseModel
from typing import List


class QuestionOut(BaseModel):
    id: int
    text: str
    options: List[str]
    is_msq: bool

    class Config:
        from_attributes = True
