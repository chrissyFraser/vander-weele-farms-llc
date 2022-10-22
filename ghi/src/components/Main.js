import React from "react";
import Produce from "./Produce";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Main(props) {
  const { produce, onAdd } = props;
  console.log(produce);
  return (
    <Row md="auto">
      {/* <h2>Produce</h2> */}

      {produce.map((produce) => (
        <Col xs="auto">
          <Produce key={produce.id} produce={produce} onAdd={onAdd} />
        </Col>
      ))}
    </Row>
  );
}

// sm="5" md="3" lg="3" xl="auto"
