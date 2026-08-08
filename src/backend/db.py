import sqlite3
import os

DATABASE = "edusubmit.db"


def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn



def init_database():

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute("""
    CREATE TABLE IF NOT EXISTS assignment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        due_date TEXT
    )
    """)


    cursor.execute("""
    CREATE TABLE IF NOT EXISTS submission (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        assignment_id INTEGER,
        student_id INTEGER,
        file_name TEXT,
        file_path TEXT,
        status TEXT,
        grade REAL,
        feedback TEXT,
        submitted_at TEXT,

        FOREIGN KEY(assignment_id)
        REFERENCES assignment(id)
    )
    """)


    cursor.execute("""
    CREATE TABLE IF NOT EXISTS material (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        course_id INTEGER,

        lecturer_id INTEGER,

        file_name TEXT,

        file_path TEXT,

        file_type TEXT,

        uploaded_at TEXT
    )
    """)


    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quiz (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        created_at TEXT
    )
    """)

    
    conn.commit()

    conn.close()