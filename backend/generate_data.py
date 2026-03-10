import requests
import random
import csv
import os

API = "http://127.0.0.1:8000/students"

names = [
    "An","Binh","Cuong","Dung","Huy","Khanh","Long","Minh",
    "Nam","Phuc","Quan","Son","Tuan","Viet","Hoang"
]

majors = [
    "Computer Science",
    "Data Science",
    "Information Technology",
    "AI",
    "Software Engineering"
]

students = []

# =========================
# Generate 50 students
# =========================

for i in range(50):

    student = {
        "name": random.choice(names) + " " + random.choice(names),
        "birth_year": random.randint(1999,2005),
        "major": random.choice(majors),
        "gpa": round(random.uniform(2.0,4.0),2),
        "class_id": random.randint(1,3)
    }

    # gửi lên API
    requests.post(API, json=student)

    students.append(student)

# =========================
# Save CSV to /data folder
# =========================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

os.makedirs(DATA_DIR, exist_ok=True)

csv_path = os.path.join(DATA_DIR, "students.csv")

with open(csv_path, "w", newline="", encoding="utf-8") as f:

    writer = csv.DictWriter(
        f,
        fieldnames=["name","birth_year","major","gpa","class_id"]
    )

    writer.writeheader()
    writer.writerows(students)

print("Generated 50 students and saved to:", csv_path)