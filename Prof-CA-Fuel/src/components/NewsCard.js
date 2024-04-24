import React from 'react';
import Card from 'react-bootstrap/Card';

const Newscard = () => {
  const cardIndices = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div class="row row-cols-1 row-cols-md-4">
    {cardIndices.map((index) => (
      <div key={index} class="col mb-4">
       <Card border="primary" style={{ borderWidth: '3px' }} >
      <Card.Header class='text-dark bg-light'>Heading</Card.Header>
      <Card.Body class='text-dark bg-light'>
        <Card.Title>Topic</Card.Title>
        <Card.Text>
        Cost of living: Thousands of drivers could claim €1,831 cash boost with little-known Fuel Grant
        </Card.Text>
      </Card.Body>
    </Card>
      </div>
    ))}
  </div>
  );
};

export default Newscard;
