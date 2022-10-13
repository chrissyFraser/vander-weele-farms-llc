import React from 'react';

export default function Produce(props) {
    const {produce, onAdd} = props;
    return (
        <div className="card">
            <img className="small" src={produce.picture_file} alt={produce.product_name}/>
            <h3>{produce.product_name}</h3>
            <div>Availability:{produce.available}</div>
            <div>Height: {produce.height}</div>
            <div>Length: {produce.length}</div>
            <div>Width: {produce.width}</div>
            <br></br>  
            <div>
                <button onClick={()=>onAdd(produce)}>Add to Cart</button>
            </div>
        </div>
    );
}