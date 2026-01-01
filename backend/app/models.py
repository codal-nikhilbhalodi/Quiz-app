from sqlalchemy import Column, Integer, String, Boolean, JSON
from app.db import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)

    options = Column(JSON, nullable=False)
    correct_answer = Column(String, nullable=False)

    is_msq = Column(Boolean, default=False)
