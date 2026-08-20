from flask import Blueprint, request, jsonify

from models import create_quiz, get_quizzes


quiz_bp = Blueprint(
    "quiz",
    __name__
)


# CREATE QUIZ
@quiz_bp.route(
    "/api/quizzes",
    methods=["POST"]
)
def add_quiz():

    data = request.json


    quiz_id = create_quiz(
        data["course_id"],
        data["title"],
        data["description"]
    )


    return jsonify({
        "message": "Quiz created",
        "id": quiz_id
    })



# GET QUIZZES BY COURSE
@quiz_bp.route(
    "/api/quizzes/<int:course_id>",
    methods=["GET"]
)
def list_quizzes(course_id):

    quizzes = get_quizzes(course_id)


    return jsonify(
        [dict(q) for q in quizzes]
    )