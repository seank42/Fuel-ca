import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, DropdownButton, Dropdown, Button, Container } from 'react-bootstrap';

const TheNavbar = ({ search, onHandleChange, authenticated, onAuthenticated }) => {
  const navigate = useNavigate();

  const signup = () => {
    onAuthenticated(true);
    navigate('/login');
  };

  const handleChange = (e) => {
    navigate("/all-diesel");
    onHandleChange(e);
  };

  return (
    <Navbar bg="dark" className=" mb-2">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link as={Link} to="/home" className="text-primary me-3 fw-bold"> Home </Nav.Link>
            <Nav.Link as={Link} to="/create-station" className="text-light me-3">
              Create Station
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/edit-station" className="text-light me-3">
              Edit Station
            </Nav.Link> */}
            <Nav.Link as={Link} to="/View-EPorts" className="text-light me-3">
              View E-charging stations
            </Nav.Link>
            <DropdownButton
              title="Fuel Prices"
              variant="primary"
              className="ms-3"
            >
              <Dropdown.Item as={Link} to="/all-petrol" className="text-dark me-3">All Petrol</Dropdown.Item>
              <Dropdown.Item as={Link} to="/all-diesel" className="text-dark me-3">All Diesel</Dropdown.Item>
            </DropdownButton>
          </Nav>
          <div className="ms-auto">
            <Button variant="outline-light" onClick={signup} className='text-light'>
              Sign up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TheNavbar;