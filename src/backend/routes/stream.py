from flask import Blueprint, jsonify, request
from datetime import datetime

stream_bp = Blueprint("stream", __name__)

streams_data = [
    {"id": 1, "courseId": 1, "type": "announcement", "author": "TS. Nguyễn Văn A", "content": "Chào các bạn, tuần này lớp ta sẽ thảo luận về quy trình Scrum và đặc tả yêu cầu phần mềm.", "createdAt": "2026-08-05T09:00:00"},
    {"id": 2, "courseId": 1, "type": "assignment", "author": "TS. Nguyễn Văn A", "content": "Đã đăng bài tập mới: SRS Document V1.0", "createdAt": "2026-08-06T14:00:00"}
]

# [GET] /api/stream/<course_id> -> Lấy bài đăng của lớp
@stream_bp.route("/<int:course_id>", methods=["GET"])
def get_stream(course_id):
    result = [s for s in streams_data if s["courseId"] == course_id]
    return jsonify({"success": True, "data": result}), 200

# [POST] /api/stream/<course_id> -> Đăng thông báo mới
@stream_bp.route("/<int:course_id>", methods=["POST"])
def create_post(course_id):
    content = request.json.get("content")
    if not content:
        return jsonify({"success": False, "message": "Nội dung không được để trống!"}), 400

    new_post = {
        "id": len(streams_data) + 1,
        "courseId": course_id,
        "type": "announcement",
        "author": request.json.get("author", "TS. Nguyễn Văn A"),
        "content": content,
        "createdAt": datetime.now().isoformat()
    }
    streams_data.insert(0, new_post) # Đưa lên đầu danh sách
    return jsonify({"success": True, "data": new_post}), 201