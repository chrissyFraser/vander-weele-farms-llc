import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";



function ProduceItem(props){
        const [item, setItem] = useState([]);
        // const [delete, setDelete] = useState([]);
        useEffect(() => {
            async function getProduceItem() {
                let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/${props.produce_id}`;
                let response = await fetch(url);
                let data = await response.json();
                if(response.ok){
                    setItem(data);
            }
        }
            getProduceItem();
            }, [])

            const handleDelete = e => {
                fetch(`${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/${props.produce_id}/delete`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                }).then(() =>{
                    console.log("Produce deleted")
                })
            };

    return(
        <table className="table is-striped">
            <thead>
                <tr>
                <th>Name</th>
                <th>Available</th>
                <th>Picture</th>
                <th>Length</th>
                <th>Height</th>
                <th>Width</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{item.product_name}
                    </td>
                    <td className="has-text-centered">
                    {item.available ? 'Yes' : 'No'}
                    </td>
                    <td>
                    <img
                        src= {`https:vwimageuploads.s3.us-west-2.amazonaws.com/${item.picture_file}`}
                        id="image"
                        alt="Thumbnail"
                        className="user-post"
                        width={100}
                        />
                    </td>
                    <td>{item.length}</td>
                    <td>{item.height}</td>
                    <td>{item.width}</td>
                    <td><button type="button" className="btn btn-primary" id = "delete_item button" 
                    onClick = {() => handleDelete(`/produce-admin/${item.produce_id}`)}>Delete Item</button></td>
                </tr>
            </tbody>
            </table>
    )
}
export default ProduceItem