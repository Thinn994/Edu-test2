from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta

assignment_bp = Blueprint("assignments", __name__)

assignments_data = [
    {"id": 1, "courseId": 1, "title": "SRS Document V1.0", "description": "Nộp bản đặc tả yêu cầu phần mềm (định dạng PDF).", "dueDate": "2026-08-15T23:59:00", "maxScore": 10, "isQuiz": False},
    {"id": 2, "courseId": 1, "title": "Kiểm tra trắc nghiệm Agile & Scrum", "description": "Quiz trắc nghiệm 15 câu tự động chấm điểm.", "dueDate": "2026-08-20T23:59:00", "maxScore": 10, "isQuiz": True},
    {"id": 3, "courseId": 2, "title": "Triển khai thuật toán A* (Python)", "description": "Nộp source code bài tập tìm đường đi ngắn nhất.", "dueDate": "2026-08-18T23:59:00", "maxScore": 10, "isQuiz": False}
]

# [GET] /api/assignments/course/<course_id> -> Lấy bài tập của lớp
@assignment_bp.route("/course/<int:course_id>", methods=["GET"])
def get_assignments_by_course(course_id):
    result = [a for a in assignments_data if a["courseId"] == course_id]
    return jsonify({"success": True, "data": result}), 200

# [POST] /api/assignments -> Tạo bài tập mới
@assignment_bp.route("/", methods=["POST"])
def create_assignment():
    data = request.json
    title = data.get("title")
    if not title:
        return jsonify({"success": False, "message": "Tên bài tập là bắt buộc!"}), 400

    new_assignment = {
        "id": len(assignments_data) + 1,
        "courseId": data.get("courseId", 1),
        "title": title,
        "description": data.get("description", ""),
        "dueDate": data.get("dueDate", (datetime.now() + timedelta(days=7)).isoformat()),
        "maxScore": data.get("maxScore", 10),
        "isQuiz": data.get("isQuiz", False)
    }
    assignments_data.append(new_assignment)
    return jsonify({"success": True, "data": new_assignment}), 201