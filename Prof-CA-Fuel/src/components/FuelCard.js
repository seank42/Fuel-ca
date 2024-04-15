import React from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const FuelCard = (props) => {
  return (
    <Container>
    <Card className="h-100 bg-dark">
    <Card.Body className='text-light'>
      <Card.Title className="fw-bold">Fuel</Card.Title>
      <Card.Text>Fuel Type: {props.fuel_type}</Card.Text>
      <Card.Text>Price: {props.price}</Card.Text>
      <Card.Text>Rating: {props.rating}</Card.Text>
    </Card.Body>
  </Card>
  </Container>
  );
};

export default FuelCard;