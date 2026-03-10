from sqlalchemy.orm import Session
import models

def create_student(db: Session, student):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def get_students(db: Session, search=None):

    query = db.query(models.Student)

    if search:
        query = query.filter(models.Student.name.contains(search))

    return query.all()


def delete_student(db: Session, student_id):
    student = db.query(models.Student).filter(
        models.Student.student_id == student_id
    ).first()

    db.delete(student)
    db.commit()