from flask import Blueprint, request, jsonify
from db import get_connection

profile_bp = Blueprint(
    "profile",
    __name__
)

# Mock user ID for development since we don't have auth yet
CURRENT_USER_ID = 1

@profile_bp.route("/api/profile", methods=["GET"])
def get_profile():
    conn = get_connection()
    
    # Try to get user from DB, if not exists, return mock
    user = conn.execute("SELECT * FROM user WHERE id = ?", (CURRENT_USER_ID,)).fetchone()
    conn.close()
    
    if user:
        return jsonify(dict(user))
    
    # Fallback mock data for initial testing
    return jsonify({
        "id": CURRENT_USER_ID,
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "avatar_url": "",
        "bio": "Computer Science student at EduSubmit University",
        "created_at": "2024-01-01"
    })

@profile_bp.route("/api/profile", methods=["PUT"])
def update_profile():
    data = request.json
    conn = get_connection()
    
    # Update logic (Simplified)
    conn.execute(
        "UPDATE user SET full_name = ?, email = ?, bio = ? WHERE id = ?",
        (data.get('full_name'), data.get('email'), data.get('bio'), CURRENT_USER_ID)
    )
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Profile updated successfully"})

@profile_bp.route("/api/profile/stats", methods=["GET"])
def get_profile_stats():
    # In a real app, we would fetch based on role
    # We'll return both and let frontend filter for now
    return jsonify({
        "student": {
            "gpa": "3.8",
            "completed_courses": 12,
            "current_semester": "Fall 2025",
            "recent_grades": [
                {"assignment": "SRS Doc", "grade": "95%"},
                {"assignment": "UI Design", "grade": "88%"}
            ]
        },
        "teacher": {
            "active_classes": 4,
            "total_students": 120,
            "avg_class_score": "82%",
            "teaching_load": "15 hours/week"
        }
    })
