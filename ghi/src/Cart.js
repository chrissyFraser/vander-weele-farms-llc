import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main.js";
import Basket from "./components/Basket.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Cart(props) {
  const [cartItems, setCartItems] = useState([]);
  console.log("YO", props);
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
      setCartItems(cartItems.filter((x) => x.id !== produce.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === produce.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <>
      <div>
        <Header
          countCartItems={cartItems.reduce((a, v) => (a = a + v.qty), 0)}
        ></Header>
        <Row>
          <Col>
            <Main onAdd={onAdd} produce={props.get_all_produce} />
          </Col>
          <Col xs={6} md={4} >
            <Basket 
              onAdd={onAdd}
              onRemove={onRemove}
              cartItems={cartItems}
            ></Basket>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Cart;
