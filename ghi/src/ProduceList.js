// commenting out these imports, imported but never used
// import ProduceItem from './ProduceItem';
// import { useEffect, useState } from 'react';

// removed BrowserRouter, NavLink, Route, Routes, useParams from this import
import { useAuthContext } from './Auth';
import { useNavigate } from "react-router-dom";


function ProduceList(props){
    // const { token } = useAuthContext();
    let navigate = useNavigate(); 
    const createProduce = "/produce-create"; 


    // ID was unused, commenting out until it needs to be used
    // let {ID} = useParams();
    // if (token) {
        return(
            <>
            <button type="button" className="btn btn-primary" id = "create-new button" onClick = {() =>navigate(createProduce)}>Create New</button>
            <div className="columns is-centered">
            <div className="column is-narrow">
                <table className="table is-striped">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Available</th>
                    <th>Picture</th>
                    <th>Get Item</th>
                    <th>Edit Item</th>
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
                            src= {`https://vwimageuploads.s3.us-west-2.amazonaws.com/${produce.picture_file}`}
                            id="image"
                            alt="Thumbnail"
                            className="user-post"
                            width={100}
                            />
                        </td>
                        <td><button type="button" className="btn btn-primary" id = "get_item button"
                        produce_id = {produce.id} 
                        onClick = {() => {navigate(`/produce-admin/${produce.id}`);
                        props.setProduceId(produce.id)
                        }}>view Item</button>
                        </td>
                        <td>
                        <button type="button" className="btn btn-primary" id = "get_item button"
                        produce_id = {produce.id} 
                        onClick = {() => {navigate(`/produce-admin/${produce.id}/patch`);
                        props.setProduceId(produce.id)
                        }}>Edit</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
            </>
    )
    // } else {
    //     return(
    //         <>
    //             <h2>You do not have access to this page</h2>
    //         </>
    // )
    // }
}
export default ProduceList