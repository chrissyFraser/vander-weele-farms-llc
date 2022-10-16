import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import ProduceItem from './ProduceItem';




function ProduceList(props){
    console.log(props)
    const [produce_item, setProduceItem] = useState({});
    // console.log("my props", props.get_all_produce[1])
    let navigate = useNavigate(); 
    const createProduce = "/produce-create"; 
    // {props.get_all_produce.map(produce => (
    // const getProduceItem = `/produce-item/${produce.id}`
    // console.log(props.get_all_produce)
    // ))}
    
   
    
    
    // const routeChange = () =>{ 
    //     // {props.get_all_produce.map(produce => (
            
    //     navigate(`/produce-item/${produce_item}`)
        // ))}
// }
    
    


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
                    <td><button type="button" className="btn btn-primary" id = "get_item button"
                    produce_item = {produce.id.id} onChange={pi  => setProduceItem(pi.target.value)}
                    onClick = {() =>navigate(`/produce-item/${produce.id}`)}>view Item</button>
                    
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