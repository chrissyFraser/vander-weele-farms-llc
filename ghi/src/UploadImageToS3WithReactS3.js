import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import {S3_BUCKET, REGION, ACCESS_KEY, SECRET_ACCESS_KEY} from ;
window.Buffer = window.Buffer || require("buffer").Buffer;



function UploadImageToS3WithReactS3() {
    // const S3_BUCKET = 'vwimageuploads'
    // const REGION = 'us-west-2'
    // const ACCESS_KEY = 'AKIAYG3CDL3SUFP5FD5L'
    // const SECRET_ACCESS_KEY = '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'
    // Generate a new api key when you get the backend call for this shit done.

    const config = {
        bucketName: S3_BUCKET,
        region: REGION,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
}


    const [selectedFile, setSelectedFile] = useState('');

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const handleUpload = async (file) => {
        console.log("firing")
        uploadFile(file, config)
        console.log(file)
        
            // .then(data => console.log(data))
            // .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}  />
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
        {/* <div id="preview">
                <img
                src={selectedFile}
                id="image"
                alt="Thumbnail"
                className="user-post"
                width={100}
                />
            </div> */}
    </div>
}

export default UploadImageToS3WithReactS3;
// import React from "react";
// import {useForm} from "react-hook-form"
// import { useState } from "react";

// function Upload(){
//     const{register, setRegister} = useState('')
//     // const{handleSubmit} = useForm()
//     const handleSubmit = (data) => {
//         console.log(data)
//     }

//     return(
//         <form onSubmit={handleSubmit}>
//             <input ref = {register}  type = "file" name = "image" />
//             <button>Submit</button>
//         </form>
//     )
// }
// export default Upload



// https:vwimageuploads.s3.us-west-2.amazonaws.com
