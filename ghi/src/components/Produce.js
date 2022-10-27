import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export default function Produce(props) {
    const {produce, onAdd} = props;
    return (
        <Row className="g-4">
        <Card>
            <Card.Img variant="top" src={`https:vwimageuploads.s3.us-west-2.amazonaws.com/${produce.picture_file}`} alt={produce.product_name}/>
            <Card.Body>
            <Card.Footer>
            <Card.Title>{produce.product_name}</Card.Title>
            {/* <div>Availability:{produce.available}</div> */}
            {/* <div>Height: {produce.height}</div>
            <div>Length: {produce.length}</div>
            <div>Width: {produce.width}</div> */}
            
            <div>
                <button onClick={()=>onAdd(produce)}>Add to Cart</button>
            </div>
            </Card.Footer>
            </Card.Body>
        </Card>
        </Row>
    );
}