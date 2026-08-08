const API_URL = "http://127.0.0.1:5000";


export async function getSubmissions(){

    const response = await fetch(
        `${API_URL}/api/submissions`
    );

    return response.json();
}


export async function gradeSubmission(
    id,
    grade,
    feedback
){

    const response = await fetch(
        `${API_URL}/api/submissions/${id}/grade`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                grade,
                feedback
            })
        }
    );


    return response.json();
}



//Upload materials
export async function uploadMaterial(
    file,
    course_id,
    lecturer_id
){

    const formData = new FormData();


    formData.append(
        "file",
        file
    );


    formData.append(
        "course_id",
        course_id
    );


    formData.append(
        "lecturer_id",
        lecturer_id
    );


    const response = await fetch(
        `${API_URL}/api/materials`,
        {
            method:"POST",
            body:formData
        }
    );


    return response.json();

}



// Get materials
export async function getMaterials(
    course_id
){

    const response = await fetch(
        `${API_URL}/api/materials/${course_id}`
    );


    return response.json();

}



export function downloadMaterial(id){

    window.open(
        `${API_URL}/api/materials/download/${id}`,
        "_blank"
    );

}



export async function createQuiz(
    course_id,
    title,
    description
){

    const response = await fetch(
        `${API_URL}/api/quizzes`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                course_id,
                title,
                description
            })
        }
    );


    return response.json();

}



export async function getQuizzes(course_id){

    const response = await fetch(
        `${API_URL}/api/quizzes/${course_id}`
    );


    return response.json();

}