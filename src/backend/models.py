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