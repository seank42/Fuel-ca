import React from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const TheNavbar = ({ props, search, onHandleChange, authenticated, onAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    onAuthenticated(false);
    navigate('/');
  };

  const handleChange = (e) => {
    navigate('/fuelstation');
    onHandleChange(e.target.value); 
  };

  const handleChangeD = (e) => {
    navigate('/allfuel');
    onHandleChange(e.target.value); 
  };

  const shouldShowSearchBarFuelStation = location.pathname === '/fuelstation';
  const shouldShowSearchBarAllDiesel = location.pathname === '/all-fuel';

  return (
    <Navbar bg="dark" variant="dark" className="mb-2">
      <Navbar.Brand as={Link} to="/home" className="me-5 fw-bold">Home</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/View-EPorts" className="text-light me-3">View Fuel Station Map</Nav.Link>
        <Nav.Link as={Link} to="/fuelstation" className="text-light me-3">Fuel Stations</Nav.Link>
        <Nav.Link as={Link} to="/all-fuel" className="text-light me-3">Fuel</Nav.Link>
      <Nav.Link as={Link} to="/favourites/index" className="text-light me-3">Favourites</Nav.Link>

      </Nav>
      {shouldShowSearchBarFuelStation && (
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Enter search..."
            className="mr-3"
            aria-label="Search"
            onChange={onHandleChange}
            value={search}
          />
        </Form>
      )}
      {shouldShowSearchBarAllDiesel && (
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Enter search..."
            className="mr-3"
            aria-label="Search"
            onChange={onHandleChange}
            value={search}
          />
        </Form>
      )}
      <div className="ms-auto">
        <Button variant="outline-light" onClick={logout}>Logout</Button>
      </div>
    </Navbar>
  );
};

export default TheNavbar;
