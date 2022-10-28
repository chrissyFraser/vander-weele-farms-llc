import React from "react";
import { useState } from 'react';
import {  useAuthContext } from '../Auth';
// import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
// import datetime

export default function Basket(props) {
    console.log("cart", props)
    const { cartItems, onAdd, onRemove } = props;
    // const [data, setData] = useState();
    // const [product_name, setProduct] = useState();
    // const [qty, setQty] = useState();



    const { token } = useAuthContext();
        function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    // function cartAlert() {
    //     return (
    //         <>
    //         {['success',
    //         ].map((variant) => (
    //             <Alert key={variant} variant={variant}>
    //             Thank you for your order!
    //             </Alert>
    //         ))}
    //         </>
    //     );
    //     }

    
    const navigate = useNavigate();

        const num1 = cartItems.map((item) => (item.id))
        const num2 = cartItems.map((item) => (item.qty))
        console.log("num1", num1)
        console.log("num2", num2)
       

        let numLen = num1.length
        console.log("num1 length", numLen)

        
    const handleClick = async () => {
        
        
    
        
        while (numLen > 0) { 
        
        const data1 = parseJwt(token)
        const user = Object.values(data1)
        const myUser = user[3]
        const valuesUser = Object.values(myUser)
        const customer_id = parseInt(valuesUser[0])
        
        const printed = false
        const driver_id = 0
        const od = Date.now()
        const order_date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(od)
        
        
        let index = numLen - 1
        let produce_id = num1[index]
        let qty = num2[index]    
        
        const data = {
                customer_id,
                produce_id,
                qty,
                driver_id,
                order_date,
                printed
        };

        console.log("data", data);
        fetch(`${process.env.REACT_APP_API_HOST_MONOLITH}/api/orders`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            
        }).then(() =>{
            navigate("/")
        }
        )

        // const response = await fetch(`${process.env.REACT_APP_API_HOST_MONOLITH}/api/orders`, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json',
        //     },
        // });

        // const result = await response.json();

        // console.log('result is: ', JSON.stringify(result));

        // setData(result);
        // cartAlert();
        // navigate("/")
        numLen -=1
};
}  
    
// console.log(data);

 
    return (
        <aside className="block col-1">
            <h2>Basket</h2>
            {cartItems.length === 0 && <div>Basket is Empty</div>}
            {cartItems.map((item) => (
                <div key={item.id} className="row">
                    <div className="col-2">{item.product_name}</div>
                    <div className="col-2">
                        <button onClick={() => onRemove(item)} className="remove">-</button>
                        <button onClick={() => onAdd(item)} className="add">+</button>
                    </div>
                    <div className="col-2">
                        {item.qty}
                    </div>
                </div>
            ))}
            {cartItems.length !== 0 && (
                <>
                    <hr></hr>
                    <div className="row"></div>
                    <div className="col-2">Total Quantity</div>
                    <div className="col-1">{cartItems.reduce((a, v) => a = a + v.qty, 0)}</div>
                    <hr />
                    <div className="row">
                        <button onClick={handleClick}>
                            Submit
                        </button>
                    </div>

                </>
            )}
        </aside>
);
}