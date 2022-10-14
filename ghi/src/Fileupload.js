// // import React from 'react';
// // import axios from 'axios';
// // import "./styles.css";
// import { useEffect, useState } from "react";
// import {} from "react-router-dom";
// // import { useSelector } from "react-redux";
// import axios from "axios";


// const Fileupload = () => {
//     const [picture_file, setPictureFile] = useState();
//     const [preview, setPreview] = useState(null);

//     const onAddImage = (file) => {
//         window.URL.revokeObjectURL(preview);
//         setPreview(window.URL.createObjectURL(file));

//     };

//     return (
//         <div className="page">
//             <div className="upload-card">
//             <div id="preview">
//                 <img
//                 src={preview}
//                 id="image"
//                 alt="Thumbnail"
//                 className="user-post"
//                 width={100}
//                 />
//             </div>
//         </div>
//         <div className="upload-container">
//             <div className="post-form-container">
//                 <p id="upload-form-label">Hello, feel free to post an image!</p>
//                 <form
//                 className="upload-form"
//                 >
//                 <div className="panel">
//                     <div className="button_outer">
//                         <div className="btn_upload">
//                         <input
//                             filename={picture_file}
//                             onChange={(e) => onAddImage(e.target.files[0])}
//                             type="file"
//                             accept="image/*"
//                             id="image-selection-btn"
//                             ></input>
//                     Choose your Art
//                         </div>
//                     </div>
//                 </div>
//             <button type="submit" id="post-upload-btn">
//                 Upload Image
//             </button>
//             </form>
//         </div>
//         </div>
//     </div>
//     );
// }




// //   // a local state to store the currently selected file.
// //   const [selectedFile, setSelectedFile] = React.useState(null);
  

// //   const handleSubmit = async(event) => {
// //     event.preventDefault()
// //     const formData = new FormData();
// //     formData.append("selectedFile", selectedFile);
// //     try {
// //       const response = await axios({
// //         method: "post",
// //         url: "/api/upload/file",
// //         data: formData,
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //     } catch(error) {
// //       console.log(error)
// //     }
// //   }

// //   const handleFileSelect = (event) => {
// //     setSelectedFile(event.target.files[0])
// //   }

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input type="file" onChange={handleFileSelect}/>
// //       <input type="submit" value="Upload File" />
// //     </form>
// //   )
// // };

// export default Fileupload;