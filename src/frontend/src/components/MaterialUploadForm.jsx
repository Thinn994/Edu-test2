import { useState } from "react";
import { uploadMaterial } from "../services/api";


function MaterialUploadForm(){

    const [file, setFile] = useState(null);


    async function handleUpload(){

        if(!file){
            alert("Please select a file");
            return;
        }


        const result = await uploadMaterial(
            file,
            1, // course_id test
            1  // lecturer_id test
        );


        alert(result.message);

        setFile(null);
    }



    return (

        <div>

            <h2>
                Upload Course Material
            </h2>


            <input
                type="file"
                onChange={
                    (e)=>setFile(
                        e.target.files[0]
                    )
                }
            />


            <button
                onClick={handleUpload}
            >
                Upload
            </button>


        </div>

    );

}


export default MaterialUploadForm;