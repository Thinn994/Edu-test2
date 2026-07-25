from flask import Flask
from flask_cors import CORS
from routes.submissions import submission_bp
from routes.reviews import review_bp
from db import init_database


app = Flask(__name__)

CORS(app)


app.config["UPLOAD_FOLDER"] = "uploads"
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024


init_database()


@app.route("/")
def home():
    return {
        "message":"EduSubmit API running"
    }


app.register_blueprint(
    submission_bp
)

app.register_blueprint(
    review_bp
)


if __name__ == "__main__":
    app.run(debug=True)