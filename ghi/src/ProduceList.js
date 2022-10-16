import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";




function ProduceList(props){
console.log(props)
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = "/produce-create"; 
    navigate(path);
    }
    


    return(
        <>
        <button type="button" className="btn btn-primary" id = "create-new button" onClick = {routeChange}>Create New</button>
        <div className="columns is-centered">
        <div className="column is-narrow">
            <table className="table is-striped">
            <thead>
                <tr>
                <th>Name</th>
                <th>Available</th>
                <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {props.get_all_produce.map(produce => (
                <tr key={produce.id}>
                    <td>{produce.product_name}
                    </td>
                    <td className="has-text-centered">
                    {produce.available ? 'Yes' : 'No'}
                    </td>
                    <td>
                    <img
                        src= {`https:vwimageuploads.s3.us-west-2.amazonaws.com/${produce.picture_file}`}
                        id="image"
                        alt="Thumbnail"
                        className="user-post"
                        width={100}
                        />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
        </>
)}
export default ProduceList