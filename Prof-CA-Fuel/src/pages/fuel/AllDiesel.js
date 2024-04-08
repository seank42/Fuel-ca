import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AllDiesel = ({ search, authenticated }) => {
  
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredFuels, setFilteredFuels] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost/api/fuels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuels(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search.length <= 1) {
      setFilteredFuels(fuels);
    } else {
      let filter = fuels.filter((fuel) => {
        return fuel.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredFuels(filter);
    }
  }, [fuels, search]);
  if (loading) return "Loading...";

  const cardIndices = Array.from({ length: 20 }, (_, index) => index);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h2>All Diesel</h2>
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
        <div className="row row-cols-1 row-cols-md-4 ">
          {cardIndices.map((index) => (
            <div key={index} className="col mb-4">
              <Card className="h-100 bg-dark">
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

export default AllDiesel;