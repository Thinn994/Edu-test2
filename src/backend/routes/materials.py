from flask import Blueprint, request, jsonify, send_file
import os

from models import create_material, get_materials


material_bp = Blueprint(
    "material",
    __name__
)


UPLOAD_FOLDER = "uploads/materials"


os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


# Upload material
@material_bp.route(
    "/api/materials",
    methods=["POST"]
)
def upload_material():

    file = request.files["file"]

    course_id = request.form["course_id"]

    lecturer_id = request.form["lecturer_id"]


    path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )


    file.save(path)


    create_material(
        course_id,
        lecturer_id,
        file.filename,
        path,
        file.content_type
    )


    return jsonify({
        "message": "Material uploaded successfully"
    })



# Get materials by course
@material_bp.route(
    "/api/materials/<int:course_id>",
    methods=["GET"]
)
def list_materials(course_id):


    rows = get_materials(course_id)


    return jsonify(
        [
            dict(row)
            for row in rows
        ]
    )



@material_bp.route(
    "/api/materials/download/<int:id>",
    methods=["GET"]
)
def download_material(id):

    from db import get_connection


    conn = get_connection()


    material = conn.execute(
        """
        SELECT *
        FROM material
        WHERE id=?
        """,
        (id,)
    ).fetchone()


    conn.close()


    if material is None:
        return jsonify({
            "message":"Material not found"
        }),404



    return send_file(
        material["file_path"],
        as_attachment=True,
        download_name=material["file_name"]
    )