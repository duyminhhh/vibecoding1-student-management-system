from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, crud, schemas
from database import engine, SessionLocal
import pandas as pd
from fastapi.responses import FileResponse

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# =============================
# DATABASE CONNECTION
# =============================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =============================
# STUDENT APIs
# =============================

# LIST STUDENTS + SEARCH
@app.get("/students")
def list_students(search: str = None, db: Session = Depends(get_db)):
    return crud.get_students(db, search)


# ADD STUDENT
@app.post("/students")
def add_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.create_student(db, student)


# UPDATE STUDENT
@app.put("/students/{student_id}")
def update_student(student_id: int, student: schemas.StudentCreate, db: Session = Depends(get_db)):

    db_student = db.query(models.Student).filter(
        models.Student.student_id == student_id
    ).first()

    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")

    db_student.name = student.name
    db_student.birth_year = student.birth_year
    db_student.major = student.major
    db_student.gpa = student.gpa
    db_student.class_id = student.class_id

    db.commit()
    db.refresh(db_student)

    return db_student


# DELETE STUDENT
@app.delete("/students/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):

    student = db.query(models.Student).filter(
        models.Student.student_id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(student)
    db.commit()

    return {"message": "Student deleted"}


# =============================
# CLASS APIs
# =============================

# ADD CLASS
@app.post("/classes")
def add_class(class_name: str, advisor: str, db: Session = Depends(get_db)):

    new_class = models.Class(
        class_name=class_name,
        advisor=advisor
    )

    db.add(new_class)
    db.commit()
    db.refresh(new_class)

    return new_class


# LIST CLASSES
@app.get("/classes")
def list_classes(db: Session = Depends(get_db)):

    classes = db.query(models.Class).all()

    return classes


# =============================
# STATISTICS
# =============================
@app.get("/stats")
def stats(db: Session = Depends(get_db)):

    students = db.query(models.Student).all()

    total = len(students)

    avg_gpa = (
        sum(s.gpa for s in students) / total
        if total > 0 else 0
    )

    major_count = {}

    for s in students:
        major_count[s.major] = major_count.get(s.major, 0) + 1

    return {
        "total_students": total,
        "average_gpa": avg_gpa,
        "students_by_major": major_count
    }


# =============================
# EXPORT CSV
# =============================
@app.get("/export")
def export_csv(db: Session = Depends(get_db)):

    students = db.query(models.Student).all()

    data = []

    for s in students:
        data.append({
            "student_id": s.student_id,
            "name": s.name,
            "birth_year": s.birth_year,
            "major": s.major,
            "gpa": s.gpa,
            "class_id": s.class_id
        })

    df = pd.DataFrame(data)

    file = "students_export.csv"

    df.to_csv(file, index=False)

    return FileResponse(file)