import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ErrorNotification from './ErrorNotification';
import Header from './components/Header';
import Main from './components/Main.js';
import Basket from './components/Basket.js';
// import data from './produce_data_test'

function GetProduce(props) {
    console.log(props)
    // const { produce } = data;
    const [produce, setProduce] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce`;
            let response = await fetch(url);
            let data = await response.json();

            if (response.ok) {
                setProduce(data.produce);
            } else {
                setError(data.message);
            }
        }
        getData();
    }, [])

    const [cartItems, setCartItems] = useState([]);
    const onAdd = (produce) => {
        const exist = cartItems.find((x) => x.id === produce.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === produce.id ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...produce, qty: 1 }]);

        }
    };
    const onRemove = (produce) => {
        const exist = cartItems.find((x) => x.id === produce.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== produce.id))
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === produce.id ? { ...exist, qty: exist.qty - 1 } : x
                )
            )
        }
    }
    return <>
        <div>
            <Header countCartItems={cartItems.reduce((a, v) => a = a + v.qty, 0)}></Header>
            <div className="row">
                <Main onAdd={onAdd} produce={produce} />
                <Basket
                    onAdd={onAdd}
                    onRemove={onRemove}
                    cartItems={cartItems}>
                </Basket>
            </div>
        </div>
    </>
}
export default GetProduce;
