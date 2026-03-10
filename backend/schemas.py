from pydantic import BaseModel

class StudentCreate(BaseModel):
    name: str
    birth_year: int
    major: str
    gpa: float
    class_id: int

class Student(StudentCreate):
    student_id: int

    class Config:
        orm_mode = True