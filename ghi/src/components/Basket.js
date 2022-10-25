import React from "react";
import {useState} from 'react';

export default function Basket(props) {
    console.log("cart", props)
    const { cartItems, onAdd, onRemove } = props;
    const [data, setData] = useState();
    const [product_name, setProductName] = useState();
    const [qty, setQty] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    console.log(isLoading)
    console.log(err)


    const handleClick = async () => {
        setIsLoading(true);
        try {
            // props.cartItems.map(items => (
            // props.setProductName(items.product_name)
            // props.setQty(items.qty)
            // ))
            
            const data = {
                // customer_name,
                product_name,
                qty,
                // driver_name,
                // order_date,
                // printed
            };

            const response = await fetch(`${process.env.REACT_APP_API_HOST_MONOLITH}/api/orders`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            console.log('result is: ', JSON.stringify(result));

            setData(result);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
        setProductName();
        setQty();
    };

    console.log(data);


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