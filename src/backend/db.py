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


    conn.commit()
    conn.close()