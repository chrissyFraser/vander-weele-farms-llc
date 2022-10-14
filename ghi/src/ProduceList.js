import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';



function ProduceList(props){
// console.log(props)
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = "/produce-create"; 
    navigate(path);
    }
    
    // const blob = new Blob([picture_file.items[0].image.$content], {
    //     type: "image/jpeg"
    // });
    // const imageUrl = `data:image/png;base64,${picture_file.items[0].image.$content}`

    return(
        // <h1> Is this Working </h1>
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
                        src={produce.picture_file}
                        // src = {URL.createObjectURL(blob)}
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