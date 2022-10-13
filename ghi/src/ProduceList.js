import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Main from './components/Main.js';
import Basket from './components/Basket.js';

function ProduceList(props){
    // props.get_all_produce.map(produce => (
    console.log(props)
    
    // return(
        // // <h1> Is this Working </h1>
        // <div className="columns is-centered">
        // <div className="column is-narrow">
        //     <table className="table is-striped">
        //     <thead>
        //         <tr>
        //         <th>Name</th>
        //         <th>Available</th>
        //         <th>Picture</th>
        //         </tr>
        //     </thead>
        //     <tbody>
    const [cartItems, setCartItems] = useState([]);
    

    const onAdd = (props.get_all_produce.map(produce => {
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
    }))

    const onRemove = (props.get_all_produce.map(produce => {
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
    }))

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








                    {/* <td>{produce.product_name}
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
        </div> */

}

export default ProduceList