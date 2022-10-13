import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";

function ProduceCreate(props){
    const [product_name, setProductName] = useState('');
    const [picture_file, setPictureFile] = useState(null);
    const [available, setAvailable] = useState(false);
    const [height, setHeight] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');

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
            <div className="mb-3">
                <label className="form-label" htmlFor="picture_file">Choose a Picture</label>
                <input value={picture_file} onChange={pf => setPictureFile(pf.target.value)} type="file" className="form-control" id="picture_file" />
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
            <button type="submit" className="button"  id = "submit">Submit</button>
        </form>
        </>
    )
}
export default ProduceCreate