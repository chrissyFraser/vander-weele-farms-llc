import React from "react";

export default function Basket (props) {
    console.log("cart", props)
    const {cartItems, onAdd, onRemove} = props;
    return (
    <aside className="block col-1">
    <h2>Basket</h2>
        {cartItems.length === 0 && <div>Basket is Empty</div>}
        {cartItems.map((item) => (
        <div key={item.id} className="row">
        <div className="col-2">{item.product_name}</div>
        <div className="col-2">
        <button onClick={()=>onRemove(item)} className="remove">-</button>
        <button onClick={()=>onAdd(item)} className="add">+</button>
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
                <div className="col-1">{cartItems.reduce((a,v) => a = a + v.qty, 0)}</div>
            <hr/>
            <div className="row">
                <button onClick={() => alert("Implement Checkout")}>
                    Submit
                </button>
            </div>
            
            </>
                )}
    </aside>
);
}