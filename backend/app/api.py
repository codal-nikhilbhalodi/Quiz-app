from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db import SessionLocal
from app.models import Question
from app.schemas import QuestionOut

router = APIRouter()


# -------------------------
# DB Dependency
# -------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# Question Bank (from React)
# -------------------------
QUESTION_BANK = [
    {
        "question": "What is the capital of Haryana?",
        "options": ["Yamunanagar", "Panipat", "Gurgaon", "Chandigarh"],
        "answer": "Chandigarh",
    },
    {
        "question": "What is the capital of Punjab?",
        "options": ["Patiala", "Ludhiana", "Amritsar", "Chandigarh"],
        "answer": "Chandigarh",
    },
    {
        "question": "What is the capital of India?",
        "options": ["Delhi", "Mumbai", "Kolkata", "Chennai"],
        "answer": "Delhi",
    },
    {
        "question": "What is the capital of Uttarakhand?",
        "options": ["Roorkee", "Haridwar", "Dehradun", "Nanital"],
        "answer": "Dehradun",
    },
    {
        "question": "What is capital of Uttar Pradesh?",
        "options": ["GB Nagar", "Lucknow", "Prayagraj", "Agra"],
        "answer": "Lucknow",
    },
]


# -------------------------
# Helpers
# -------------------------
def seed_questions(db: Session):
    if db.query(Question).count() > 0:
        return

    questions = []
    for q in QUESTION_BANK:
        if q["answer"] not in q["options"]:
            raise ValueError("Correct answer must be one of the options")

        questions.append(
            Question(
                text=q["question"],
                options=q["options"],
                correct_answer=q["answer"],
                is_msq=False,
            )
        )

    db.add_all(questions)
    db.commit()


# -------------------------
# APIs
# -------------------------
@router.get("/questions", response_model=List[QuestionOut])
def get_questions(db: Session = Depends(get_db)):
    """
    Fetch all quiz questions from DB.
    Seeds DB if empty.
    """
    try:
        seed_questions(db)
        return db.query(Question).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/submit")
def submit_quiz(answers: dict[int, dict], db: Session = Depends(get_db)):
    """
    Submit quiz answers and calculate score.
    """
    score = 0

    for ans in answers.values():
        question = db.query(Question).filter(Question.id == ans["id"]).first()
        if question and ans["option"] == question.correct_answer:
            score += 1

    return {
        "score": score,
        "total": len(answers),
    }
