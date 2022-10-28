import React from "react";

export default function Header(props) {
  const { countCartItems } = props;
  return (
    <div className="row center block">
      <div>
        <img
          className="cart-icon"
          src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png"
          alt="cart icon"
        />
      </div>
      <div>
        <a href="#/">
          <h2>Shopping Cart</h2>
        </a>
      </div>

      <div>
        <a className="link" href="#/cart">
          Cart{" "}
          {countCartItems ? (
            <button className="badge">{countCartItems}</button>
          ) : (
            ""
          )}
        </a>
        <p></p>
        <a className="link" href="#/signin">
          Sign In
        </a>
      </div>
    </div>
  );
}
