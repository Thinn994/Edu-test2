from flask import Blueprint, jsonify, request

auth_bp = Blueprint("auth", __name__)

users_data = [
    {"id": 1, "name": "TS. Nguyễn Văn A", "email": "gv.nguyenvana@university.edu.vn", "role": "TEACHER", "avatar": "NA"},
    {"id": 2, "name": "Trần Văn B", "email": "sv.tranvanb@student.edu.vn", "role": "STUDENT", "avatar": "TB"},
    {"id": 3, "name": "ThS. Lê Thị C", "email": "gv.lethic@university.edu.vn", "role": "TEACHER", "avatar": "LC"},
    {"id": 4, "name": "Phạm Minh D", "email": "sv.phamminhd@student.edu.vn", "role": "STUDENT", "avatar": "PD"}
]

# [POST] /api/auth/login -> Đăng nhập
@auth_bp.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    user = next((u for u in users_data if u["email"] == email), None)
    if not user:
        return jsonify({"success": False, "message": "Email không tồn tại!"}), 401
    return jsonify({"success": True, "data": user, "token": f"mock-token-{user['id']}"}), 200