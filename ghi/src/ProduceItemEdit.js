import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {} from "react-router-dom";
import { uploadFile } from 'react-s3'; 
window.Buffer = window.Buffer || require("buffer").Buffer;

function ProduceItemEdit(props){
    const [product_name, setProductName] = useState('');
    const [picture_file, setPictureFile] = useState('');
    const [available, setAvailable] = useState(false);
    const [height, setHeight] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [item, setItem] = useState([]);
    const [datalength, setdataLength] = useState('');

const S3_BUCKET = props.keys.name
    const REGION = props.keys.region
    const ACCESS_KEY = props.keys.key
    const SECRET_ACCESS_KEY = props.keys.secret


    const config = {
        bucketName: S3_BUCKET,
        region: REGION,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
}

const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        setImage(reader.result);
        setPictureFile(e.target.files[0]["name"])
    });
    reader.readAsDataURL(e.target.files[0]);
    }

const handleUpload = async (file) => {
    uploadFile(file, config);
        
}
useEffect(() => {
    async function getProduceItem() {
        let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/${props.produce_id}`;
        let response = await fetch(url);
        let data = await response.json();
        if(response.ok){
            setItem(data);
            console.log(data.picture_file)
            setdataLength(data.length)
    }
}
    getProduceItem();
    }, [])


    const handleSubmit = e => {
        e.preventDefault();
    
        const data = { 
            product_name,
            picture_file,
            available,
            height,
            length,
            width 
        };

        fetch(`${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/${props.produce_id}/patch`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() =>{
            console.log("PRODUCT UPDATED")
        })
    };
    function toggle(value){
        return !value;
        }
    return( 
        <>
        <h1>Is this working? item num: {props.produce_id}</h1>
        <form className='FormSubmit' onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="product_name" className='form-label'>Product Name</label>
                <input defaultValue={item.product_name} onChange={pn => setProductName(pn.target.value)} type="text" className="form-control" id="product_name" placeholder="Product Name" />
            </div>
                <input type="file" defaultValue = {item.picture_file} onChange={handleFileInput}  />
                <div id="preview">
                    <img
                    src={image || `https://vwimageuploads.s3.us-west-2.amazonaws.com/${item.picture_file}`}
                    id="picture_file"
                    alt="Thumbnail"
                    className="user-post"
                    width={100}
                    />
                </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="available" defaultValue={item.available} onChange={() => setAvailable(toggle)} />
                <label className="form-check-label" htmlFor="available">available</label>
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="height">Height</label>
                <input defaultValue={item.height} onChange={h => setHeight(h.target.value)} placeholder="height" required type="number" name="height" id="height" className="form-control" />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="length">Length</label>
                <input defaultValue = {datalength} onChange={l => setLength(l.target.value)} placeholder="length" required type="number" name="length" id="length" className="form-control" />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="width">Width</label>
                <input defaultValue={item.width} onChange={w => setWidth(w.target.value)} placeholder="width" required type="number" name="width" id="year" className="form-control" />
            </div>
            <button onClick={() => handleUpload(selectedFile)}>Submit</button>
        </form>
        </>
    )





    // return(
    //     <h1>Is this working? item num: {props.produce_id}</h1>
    // )
}
export default ProduceItemEdit