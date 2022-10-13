import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";



function ProduceList(props){

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = "/produce-create"; 
    navigate(path);
    }


    return(
        // <h1> Is this Working </h1>
        <>
        <button type="button" class="btn btn-primary" id = "create-new button" onClick = {routeChange}>Create New</button>
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
                    {produce.picture_file}
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