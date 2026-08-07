from flask import Blueprint, jsonify
from routes.assignments import assignments_data

todo_bp = Blueprint("todo", __name__)

# [GET] /api/todo/upcoming -> Lấy danh sách bài tập sắp đến hạn
@todo_bp.route("/upcoming", methods=["GET"])
def get_upcoming_tasks():
    # Sắp xếp các bài tập theo thời gian hạn nộp gần nhất
    upcoming = sorted(assignments_data, key=lambda x: x["dueDate"])
    return jsonify({"success": True, "data": upcoming}), 200