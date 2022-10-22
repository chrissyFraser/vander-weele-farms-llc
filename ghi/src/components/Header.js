import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Header(props) {
  const { countCartItems } = props;
  return (
    <Row className="header-row">
      <Col xs="auto">
        <a className="shoppingCart-title" href="#/">
          <h2>Shopping Cart</h2>
        </a>
      </Col>

      <Col xs="auto">
        {/* <Row xs="auto"> */}
        <div className="header-custom-row">
          <Col xs="auto">
            <div className="header-custom-row-column">
              <a className="link" href="#/signin">
                Sign In
              </a>
              <a className="link" href="#/cart">
                Cart
                {countCartItems < 0 && (
                  <button className="badge">{countCartItems}</button>
                )}
              </a>
            </div>
          </Col>
          <Col xs="auto">
            <img
              className="cart-icon"
              src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png"
              alt="cart icon"
            />
          </Col>
        </div>
        {/* </Row> */}
      </Col>
    </Row>
  );
}
