import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

export default function Basket(props) {
  console.log("cart", props);
  const { cartItems, onAdd, onRemove } = props;
  return (
    <Container className="basket-container">
      <Card className="basket-card">
        <Card.Body>
          <Card.Title>Basket</Card.Title>
          <ListGroup variant="flush" className="basket-card-listgroup">
            {cartItems.length ? (
              <>
                {cartItems.map((item) => (
                  <ListGroup.Item className="d-flex ">
                    <Col className="align-items-center">
                      <div>{item.product_name}</div>
                    </Col>
                    <Col className="d-flex ">
                      <button onClick={() => onRemove(item)} className="remove">
                        -
                      </button>
                      <button onClick={() => onAdd(item)} className="add">
                        +
                      </button>
                    </Col>
                    <Col className="d-flex ">
                      <div>{item.qty}</div>
                    </Col>
                  </ListGroup.Item>
                ))}
              </>
            ) : (
              <span>Basket is Empty</span>
            )}
          </ListGroup>
          <Row className="d-flex">
            <Col className="align-self-center">Total Quantity</Col>
            <Col className="align-self-center">
              {cartItems.reduce((a, v) => (a = a + v.qty), 0)}
            </Col>
          </Row>
          <Button
            variant="success"
            size="lg"
            disabled={!cartItems.length}
            onClick={() => alert("Implement Checkout")}
          >
            Submit
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
