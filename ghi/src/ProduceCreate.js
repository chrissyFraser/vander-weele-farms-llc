import { useState } from 'react';
// import {} from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { useAuthContext } from './Auth';
window.Buffer = window.Buffer || require("buffer").Buffer;

function ProduceCreate(props){
    const { token } = useAuthContext();
    console.log(useAuthContext)

    const [product_name, setProductName] = useState('');
    const [picture_file, setPictureFile] = useState('');
    const [available, setAvailable] = useState(false);
    const [height, setHeight] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState('');


const navigate = useNavigate();

const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    setPictureFile(e.target.files[0]["name"])
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        console.log(reader.result)
        setImage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
    }

const handleUpload = (e) => {
    const formData = new FormData();
    formData.append(
        "file",
        selectedFile,
        selectedFile.name
    );

    const requestOptions = {
        method: 'POST',
        body: formData
    }
    fetch(`${process.env.REACT_APP_API_HOST_MONOLITH}/photos`, requestOptions)
    .then(response=> response.json())
    .then(function(response){
    console.log(response.json())})
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

        fetch(`${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
        },
            body: JSON.stringify(data)
        }).then(() =>{
            handleUpload(selectedFile)
            console.log("new product created")
            navigate('/produce-admin');
            window.location.reload();
        })
    };
    function toggle(value){
        return !value;
        }
    if (token) {
        return(
            <>
            <form className='FormSubmit' onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="product_name" className='form-label'>Product Name</label>
                    <input value={product_name} onChange={pn => setProductName(pn.target.value)} type="text" className="form-control" id="product_name" placeholder="Product Name" />
                </div>
                    <input type="file" onChange={handleFileInput} />
                    <div id="preview">
                        <img
                        src={image}
                        id="picture_file"
                        alt="Thumbnail"
                        className="user-post"
                        width={100}
                        />
                    </div>
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
                <button onClick={() => handleSubmit}>Submit</button>
            </form>
            </>
        );
    } 
    else {
        return(
            <>
                <h1>You do not have permission to view this page.</h1>
            </>
        );
    }

}
export default ProduceCreate