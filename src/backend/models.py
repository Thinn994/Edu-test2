from datetime import datetime

from db import get_connection

STATUS_SUBMITTED = "Submitted"


def create_submission(
    assignment_id,
    student_id,
    file_name,
    file_path
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO submission
        (
            assignment_id,
            student_id,
            file_name,
            file_path,
            status,
            submitted_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        assignment_id,
        student_id,
        file_name,
        file_path,
        STATUS_SUBMITTED,
        datetime.now().isoformat()
    ))

    submission_id = cursor.lastrowid

    conn.commit()
    conn.close()

    return submission_id


def create_material(
        course_id,
        lecturer_id,
        file_name,
        file_path,
        file_type):


    conn = get_connection()


    conn.execute("""
    INSERT INTO material
    (
        course_id,
        lecturer_id,
        file_name,
        file_path,
        file_type,
        uploaded_at
    )

    VALUES (?,?,?,?,?,?)
    """,
    (
        course_id,
        lecturer_id,
        file_name,
        file_path,
        file_type,
        datetime.now().isoformat()
    ))


    conn.commit()
    conn.close()


def get_materials(course_id):


    conn = get_connection()


    rows = conn.execute(
        """
        SELECT *
        FROM material
        WHERE course_id=?
        """,
        (course_id,)
    ).fetchall()


    conn.close()


    return rows


def create_quiz(
    course_id,
    title,
    description
):

    conn = get_connection()


    cursor = conn.cursor()


    cursor.execute("""
    INSERT INTO quiz
    (
        course_id,
        title,
        description,
        created_at
    )

    VALUES (?, ?, ?, ?)
    """,
    (
        course_id,
        title,
        description,
        datetime.now().isoformat()
    ))


    quiz_id = cursor.lastrowid


    conn.commit()
    conn.close()


    return quiz_id


def get_quizzes(course_id):

    conn = get_connection()


    rows = conn.execute(
        """
        SELECT *
        FROM quiz
        WHERE course_id=?
        """,
        (course_id,)
    ).fetchall()


    conn.close()


    return rows