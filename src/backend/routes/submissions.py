from flask import Blueprint, request, jsonify
import os

from models import create_submission
from db import get_connection


submission_bp = Blueprint(
    "submission",
    __name__
)


UPLOAD_FOLDER="uploads"


# POST upload
@submission_bp.route(
    "/api/submissions",
    methods=["POST"]
)
def submit_assignment():

    file=request.files["file"]

    assignment_id=request.form["assignment_id"]
    student_id=request.form["student_id"]


    path=os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(path)


    create_submission(
        assignment_id,
        student_id,
        file.filename,
        path
    )


    return jsonify({
        "message":"Submission successful"
    })



# GET submissions
@submission_bp.route(
    "/api/submissions",
    methods=["GET"]
)
def get_submissions():

    conn=get_connection()

    rows=conn.execute(
        """
        SELECT *
        FROM submission
        """
    ).fetchall()


    conn.close()


    return jsonify(
        [dict(row) for row in rows]
    )

@submission_bp.route(
    "/api/submissions/<int:id>",
    methods=["GET"]
)
def get_submission(id):

    conn=get_connection()

    row=conn.execute(
        """
        SELECT *
        FROM submission
        WHERE id=?
        """,
        (id,)
    ).fetchone()


    conn.close()


    return jsonify(dict(row))