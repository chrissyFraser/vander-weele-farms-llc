import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';
// import Fileupload from './Fileupload';
import {} from "react-router-dom";
import { storage } from "./firebaseConfig";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

function ProduceCreate(props){
    const [product_name, setProductName] = useState('');
    const [picture_file, setPictureFile] = useState('');
    const [available, setAvailable] = useState(false);
    const [height, setHeight] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [percent, setPercent] = useState(0);
    
    // 
    // function handleChangeImage (onAddImage) {
    //     console.log("this is working")
    //     console.log(onAddImage);
    //     var self = this;
    //     var reader = new FileReader();
    //     var file = onAddImage;
    
    //     reader.onload = function(upload) {
    //         self.setPictureFile({
    //             image: upload.target.result
    //         });
    //     };
    //     reader.readAsDataURL(file);
    //     // console.log(this.state.image);
    //     // console.log("Uploaded");
        
    // }

    // const onAddImage = (picture_file) => {
    //     console.log(picture_file)
    //     window.URL.revokeObjectURL(picture_file);
    //     setPictureFile(window.URL.createObjectURL(picture_file));
    //     console.log(picture_file)
        
    // };

    function handleUpload() {
        // if (!picture_file) {
        //     alert("Please choose a file first!")
        // }
     
        const storageRef = ref(storage,`/files/${picture_file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, picture_file);
        console.log(uploadTask)
     
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
     
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        ); 
    }

    

    const handleSubmit = e => {
        e.preventDefault();
    
        const data = { 
            product_name,
            picture_file,
            available,
            height,
            length,
            width };
            console.log(data)

        fetch(`${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() =>{
            console.log("new product created")
            console.log(`${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`)
        })
    };
    
    function toggle(value){
        return !value;
        }

    return(
        <>
        
        <h1> Is this working</h1>
        <form className='FormSubmit' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="product_name" className='form-label'>Product Name</label>
                <input value={product_name} onChange={pn => setProductName(pn.target.value)} type="text" className="form-control" id="product_name" placeholder="Product Name" />
            </div>
            -------
            <div className="mb-3">
                {/* <Fileupload value={picture_file} onChange={fileinherit} /> */}
                <label className="form-label" htmlFor="picture_file">Choose a Picture</label>
                <input
                            filename={picture_file}
                            onChange={(e) => handleUpload(picture_file)}
                            type="file"
                            accept="image/*"
                            id="image-selection-btn"
                            ></input>
                <div id="preview">
                <img
                src={picture_file}
                id="image"
                alt="Thumbnail"
                className="user-post"
                width={100}
                />
            </div>
            </div>
            ----------
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="available" value={available} onChange={() => setAvailable(toggle)} />
                <label className="form-check-label" htmlFor="available">available</label>
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="height">Height</label>
                <input value={height} onChange={h => setHeight(h.target.value)} placeholder="height" required type="number" name="height" id="height" className="form-control" />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="length">Length</label>
                <input value={length} onChange={l => setLength(l.target.value)} placeholder="length" required type="number" name="length" id="length" className="form-control" />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="width">Width</label>
                <input value={width} onChange={w => setWidth(w.target.value)} placeholder="width" required type="number" name="width" id="year" className="form-control" />
            </div>
            <button type="submit" className="button"  id = "submit">Submit</button>
        </form>
        </>
    )
}
export default ProduceCreate