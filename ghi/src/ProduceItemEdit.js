import { useEffect, useState } from 'react';
import {} from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
window.Buffer = window.Buffer || require("buffer").Buffer;


function ProduceItemEdit(props){
    const [product_name, setProductName] = useState('');
    const [picture_file, setPictureFile] = useState('');
    const [available, setAvailable] = useState(false);
    const [height, setHeight] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [item, setItem] = useState([]);
    const [datalength, setdataLength] = useState('');

const navigate = useNavigate();

const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        setImage(reader.result);
        setPictureFile(e.target.files[0]["name"])
    });
    reader.readAsDataURL(e.target.files[0]);
    }

const handleUpload = (e) => {
    const formData = new FormData();
    if(selectedFile == null){
        navigate('/produce-admin');
        window.location.reload();
    }
    else{
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
    .then(function(response)
    {
    console.log(response.json())})
    navigate('/produce-admin');
    window.location.reload();
    }
}
useEffect(() => {
    async function getProduceItem() {
        let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/${props.produce_id}`;
        let response = await fetch(url);
        let data = await response.json();
        if(response.ok){
            setItem(data);
            setdataLength(data.length)
            setProductName(data.product_name)
            setPictureFile(data.picture_file)
            setHeight(data.height)
            setLength(data.length)
            setWidth(data.width)
        }
    }
    getProduceItem();
    //eslint-disable-next-line
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
            handleUpload(selectedFile)
            console.log("PRODUCT UPDATED")
            
        })
    
    };
    function toggle(value){
        return !value;
        }
    return( 
        <>
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
                <input type="checkbox" className="form-check-input" id="available"  onChange={() => setAvailable(toggle)} />
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
            <button onClick={() => handleSubmit}>Submit</button>
        </form>
        </>
    )
}
export default ProduceItemEdit