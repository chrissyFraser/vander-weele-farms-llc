// commenting out these imports, imported but never used
// import ProduceItem from './ProduceItem';
// import { useEffect, useState } from 'react';

// removed BrowserRouter, NavLink, Route, Routes, useParams from this import
import { useAuthContext } from './Auth';
import { useNavigate } from "react-router-dom";


function ProduceList(props) {
    const { token } = useAuthContext();
    let navigate = useNavigate();
    const createProduce = "/produce-create";


    // ID was unused, commenting out until it needs to be used
    // let {ID} = useParams();

    // ###################### AUTH STUFF ###################### //
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    if (token) {
        const data = parseJwt(token)
        console.log("DATA", Object.entries(data))
        console.log("specific", Object.values(data))
        const user = Object.values(data)
        console.log(user[3])
        const myUser = user[3]
        const valuesUser = Object.values(myUser)
        console.log(valuesUser[0])
        const user_status = valuesUser[2]
        // console.log(myId)
        if (user_status.toLowerCase().includes("admin")) {
            return (
                <>
                    <button type="button" className="btn btn-warning" id="create-new button" onClick={() => navigate(createProduce)}>Create New</button>
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
                                                    src={`https://vwimageuploads.s3.us-west-2.amazonaws.com/${produce.picture_file}`}
                                                    id="image"
                                                    alt="Thumbnail"
                                                    className="user-post"
                                                    width={100}
                                                />
                                            </td>
                                            <td><button type="button" className="btn btn-warning" id="get_item button"
                                                produce_id={produce.id}
                                                onClick={() => {
                                                    navigate(`/produce-admin/${produce.id}`);
                                                    props.setProduceId(produce.id)
                                                }}>view Item</button>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-warning" id="get_item button"
                                                    produce_id={produce.id}
                                                    onClick={() => {
                                                        navigate(`/produce-admin/${produce.id}/patch`);
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
        } else {
            return (
                <>
                    <h1>Admin Only Page</h1>
                </>

            )
        }


    } else {
        return (
            <>
                <h2>Please Login</h2>
            </>
        )
    }
}
export default ProduceList