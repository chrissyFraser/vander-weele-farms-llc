import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";


function ProduceList(props){
    console.log(props)
    console.log("firing")
    return(
        // <h1> Is this Working </h1>
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
)}
export default ProduceList