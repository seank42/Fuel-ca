import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

const AllPetrol = () => {
  const cardIndices = Array.from({ length: 20 }, (_, index) => index);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h2>All Petrol</h2>
          <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Lowest price</Dropdown.Item>
              <Dropdown.Item href="#">Best rating</Dropdown.Item>
              <Dropdown.Item href="#">Brand</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="row row-cols-1 row-cols-md-4">
          {cardIndices.map((index) => (
            <div key={index} className="col mb-4">
              <Card className="h-100 bg-success">
                <Card.Body className='text-light'>
                  <Card.Title className="fw-bold">Station name </Card.Title>
                  <Card.Text>Price:</Card.Text>
                  <Card.Text>Rating:</Card.Text> 
                  <Card.Text>Location:</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default AllPetrol;