import React from 'react';
import Card from 'react-bootstrap/Card';

const NewsCard = (props) => {
  return (
    <Card border="dark" style={{ borderWidth: '3px', borderRadius: '10px', backgroundColor: '#000000' }} className="text-white h-100">
      <Card.Header className='bg-dark'>Latest Fuel News</Card.Header>
      <Card.Body className='bg-dark'>
        <Card.Title className='ms-2 me-2'>{props.title}</Card.Title>
        <Card.Text className='ms-2 me-2'>
          {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
