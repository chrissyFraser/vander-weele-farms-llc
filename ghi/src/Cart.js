
import { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main.js';
import Basket from './components/Basket.js';
import Orders from './Orders.js';
import { useAuthContext } from './Auth';



function Cart(props) {

    const [cartItems, setCartItems] = useState([]);
    console.log("YO", props)
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

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    const { token } = useAuthContext();
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
        if (user_status.toLowerCase().includes("admin")) {
            return <>
            <div>
                <Header countCartItems={cartItems.reduce((a, v) => a = a + v.qty, 0)}></Header>
                <div className="row">
                    <Main onAdd={onAdd} produce={props.get_all_produce} />
                    <Basket
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartItems={cartItems}>
                    </Basket>
                </div>
            </div>
        </>
        }
    } else {
        return (
            <h2>Please login to view your cart</h2>
        )
    }
   
}

export default Cart;