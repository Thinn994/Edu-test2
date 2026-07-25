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