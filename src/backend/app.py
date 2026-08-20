from flask import Flask, jsonify
from flask_cors import CORS
import os

from db import init_database

# Existing functional groups
from routes.submissions import submission_bp
from routes.reviews import review_bp
from routes.courses import course_bp
from routes.stream import stream_bp
from routes.assignments import assignment_bp
from routes.todo import todo_bp
from routes.auth import auth_bp

# PA4 functional groups
from routes.materials import material_bp
from routes.quizzes import quiz_bp


app = Flask(__name__)


# Enable CORS
CORS(app)


# Upload configuration
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024


os.makedirs(
    app.config["UPLOAD_FOLDER"],
    exist_ok=True
)


# Initialize database
init_database()



@app.route("/")
def home():

    return jsonify({
        "message": "EduSubmit API Server is running successfully!",
        "version": "1.0.0",
        "status": "OK"
    }), 200



# Existing modules
app.register_blueprint(
    submission_bp
)

app.register_blueprint(
    review_bp
)

app.register_blueprint(
    course_bp
)

app.register_blueprint(
    stream_bp
)

app.register_blueprint(
    assignment_bp
)

app.register_blueprint(
    todo_bp
)

app.register_blueprint(
    auth_bp
)


# PA4 modules
app.register_blueprint(
    material_bp
)

app.register_blueprint(
    quiz_bp
)



if __name__ == "__main__":

    print("=====================================================")
    print("🚀 EDUSUBMIT BACKEND SERVER IS READY!")
    print("📡 Base API Endpoint: http://localhost:5000/api")
    print("📁 Uploads directory: ./uploads (Max: 16MB)")
    print("=====================================================")

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )