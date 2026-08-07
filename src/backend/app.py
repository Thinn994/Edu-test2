import os
from flask import Flask, jsonify
from flask_cors import CORS
from db import init_database

# 1. IMPORT CÁC BLUEPRINT HIỆN CÓ CỦA NHÓM 
from routes.submissions import submission_bp
from routes.reviews import review_bp
from routes.courses import course_bp
from routes.stream import stream_bp
from routes.assignments import assignment_bp
from routes.todo import todo_bp
from routes.auth import auth_bp

app = Flask(__name__)

# Kích hoạt CORS cho toàn bộ API (Giúp Frontend React/Vite port 5173 gọi không bị chặn)
CORS(app)

# ==========================================
# CẤU HÌNH HỆ THỐNG & UPLOAD FILE (Giữ nguyên từ bản cũ)
# ==========================================
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # Giới hạn file upload tối đa 16MB

# Tự động tạo thư mục upload nếu chưa có trên máy (Tránh lỗi FileNotFoundError)
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# Khởi tạo kết nối Cơ sở dữ liệu
init_database()

# ==========================================
# BASE ROUTE / HEALTH CHECK
# ==========================================
@app.route("/")
def home():
    return jsonify({
        "message": "EduSubmit API Server is running successfully!",
        "version": "1.0.0",
        "status": "OK"
    }), 200

# ==========================================
# ĐĂNG KÝ CÁC MODULE API (BLUEPRINTS)
# ==========================================

# Các module đã có 
app.register_blueprint(submission_bp, url_prefix="/api/submissions")
app.register_blueprint(review_bp, url_prefix="/api/reviews")
app.register_blueprint(course_bp, url_prefix="/api/courses")
app.register_blueprint(stream_bp, url_prefix="/api/stream")
app.register_blueprint(assignment_bp, url_prefix="/api/assignments")
app.register_blueprint(todo_bp, url_prefix="/api/todo")
app.register_blueprint(auth_bp, url_prefix="/api/auth")

# ==========================================
# KHỞI CHẠY SERVER
# ==========================================
if __name__ == "__main__":
    print("=====================================================")
    print("🚀 EDUSUBMIT BACKEND SERVER IS READY!")
    print("📡 Base API Endpoint: http://localhost:5000/api")
    print("📁 Uploads directory: ./uploads (Max: 16MB)")
    print("=====================================================")
    app.run(host="0.0.0.0", port=5000, debug=True)