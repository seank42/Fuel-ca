import React from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const FuelCard = ({fuel}) => {
  return (
    <Container>
    <Card className="h-100 bg-dark">
    <Card.Body className='text-light'>
      <Card.Title className="fw-bold">{fuel.fuelStation.title}</Card.Title>
      <Card.Text>Fuel Type: {fuel.fuel_type}</Card.Text>
      <Card.Text>Price: {fuel.price}</Card.Text>
      <Card.Text>Rating: {fuel.rating}</Card.Text>
    </Card.Body>
  </Card>
  </Container>
  );
};

export default FuelCard;