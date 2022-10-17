import { useEffect, useState } from 'react';
import {BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';


function GetOne(){
    const [oneProduct, setOneProduct] = useState([]);
    
    

    useEffect(() => {
        async function getData() {
        

        let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/{produce_id}`;
        let response = await fetch(url);
        let data = await response.json();
        if(response.ok){
            setOneProduct(data)
            console.log(data)
        // }else {
        //     console.log("drat! something happened");
        //     setError(data.message);
        // // }


        //     url = `${process.env.REACT_APP_API_HOST_MONOLITH}/keys`;
        //     response = await fetch(url)
        //     data = await response.json();
        //     if(response.ok){
        //     setKeys(data);
        //     }
             }     }
        getData();
    }, [])

    return (
        <>
        <h1>{oneProduct.id}</h1>
        <Routes>
        <Route path="/get-one" element={<GetOne oneProduct={oneProduct} />} />
        </Routes>
        </>
    )
}

export default GetOne;