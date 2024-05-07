import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

const AllPetrol = ({ search, authenticated }) => {
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

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>All Petrol</h2>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-autoclose-true">
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Lowest price</Dropdown.Item>
            <Dropdown.Item href="#">Best rating</Dropdown.Item>
            <Dropdown.Item href="#">Brand</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="row row-cols-1 row-cols-md-4 mt-4">
        {filteredFuels.map((fuel, index) => (
          <div key={index} className="col mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="fw-bold">{fuel.station_name}</Card.Title>
                <Card.Text>Price: {fuel.price}</Card.Text>
                <Card.Text>Rating: {fuel.rating}</Card.Text>
                <Card.Text>Location: {fuel.location}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default AllPetrol;
