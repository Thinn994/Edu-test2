from flask import Blueprint, jsonify, request

course_bp = Blueprint("courses", __name__)

# Dữ liệu mẫu ban đầu (dễ dàng thay bằng query từ models.py sau này)
courses_data = [
    {"id": 1, "name": "CS300 - Software Engineering", "section": "Group 01", "teacher": "TS. Nguyễn Văn A", "code": "SE2026_G01", "color": "bg-blue-600"},
    {"id": 2, "name": "CS13002 - Artificial Intelligence", "section": "AI Foundation", "teacher": "ThS. Lê Thị C", "code": "AI_2026", "color": "bg-emerald-600"},
    {"id": 3, "name": "UI/UX Design Principles", "section": "Frontend Mastery", "teacher": "TS. Nguyễn Văn A", "code": "UIUX_2026", "color": "bg-purple-600"},
    {"id": 4, "name": "Database Systems", "section": "PostgreSQL & MongoDB", "teacher": "ThS. Lê Thị C", "code": "DB_2026", "color": "bg-orange-600"}
]

# [GET] /api/courses -> Lấy danh sách lớp học
@course_bp.route("/", methods=["GET"])
def get_courses():
    return jsonify({"success": True, "data": courses_data}), 200

# [GET] /api/courses/<id> -> Lấy thông tin chi tiết 1 lớp học
@course_bp.route("/<int:course_id>", methods=["GET"])
def get_course_detail(course_id):
    course = next((c for c in courses_data if c["id"] == course_id), None)
    if not course:
        return jsonify({"success": False, "message": "Không tìm thấy lớp học!"}), 404
    return jsonify({"success": True, "data": course}), 200

# [POST] /api/courses -> Tạo lớp học mới (Nút + trên Navbar)
@course_bp.route("/", methods=["POST"])
def create_course():
    data = request.json
    name = data.get("name")
    teacher = data.get("teacher")
    if not name or not teacher:
        return jsonify({"success": False, "message": "Tên lớp và giảng viên là bắt buộc!"}), 400

    new_course = {
        "id": len(courses_data) + 1,
        "name": name,
        "section": data.get("section", "Chung"),
        "teacher": teacher,
        "code": f"EDU_{len(courses_data) + 1001}",
        "color": data.get("color", "bg-blue-600")
    }
    courses_data.append(new_course)
    return jsonify({"success": True, "data": new_course}), 201

# [POST] /api/courses/join -> Tham gia lớp bằng mã Code
@course_bp.route("/join", methods=["POST"])
def join_course():
    code = request.json.get("code")
    course = next((c for c in courses_data if c["code"] == code), None)
    if not course:
        return jsonify({"success": False, "message": "Mã lớp không hợp lệ!"}), 404
    return jsonify({"success": True, "message": "Tham gia lớp thành công!", "data": course}), 200