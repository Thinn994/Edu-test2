from flask import Blueprint, request, jsonify
from db import get_connection


review_bp = Blueprint(
    "review",
    __name__
)


@review_bp.route(
    "/api/submissions/<int:id>/grade",
    methods=["PUT"]
)
def grade_submission(id):

    data = request.json

    grade = data["grade"]
    feedback = data["feedback"]


    conn = get_connection()

    conn.execute(
        """
        UPDATE submission
        SET grade=?,
            feedback=?,
            status=?
        WHERE id=?
        """,
        (
            grade,
            feedback,
            "Graded",
            id
        )
    )


    conn.commit()
    conn.close()


    return jsonify({
        "message":"Grade updated"
    })