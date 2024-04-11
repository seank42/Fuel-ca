import React from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const TheNavbar = ({ search, onHandleChange, authenticated, onAuthenticated }) => {
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

  const handleChangeP = (e) => {
    navigate('/allpetrol');
    onHandleChange(e.target.value); 
  };

  const handleChangeD = (e) => {
    navigate('/alldiesel');
    onHandleChange(e.target.value); 
  };

  const shouldShowSearchBarFuelStation = location.pathname === '/fuelstation';
  const shouldShowSearchBarAllPetrol = location.pathname === '/all-petrol';
  const shouldShowSearchBarAllDiesel = location.pathname === '/all-diesel';

  return (
    <Navbar bg="dark" variant="dark" className="mb-2">
      <Navbar.Brand as={Link} to="/home" className="me-5 fw-bold">Home</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/View-EPorts" className="text-light me-3">View E-Charging Stations</Nav.Link>
        <Nav.Link as={Link} to="/fuelstation" className="text-light me-3">Fuel Stations</Nav.Link>
        <NavDropdown title="Fuel Prices" id="basic-nav-dropdown" className="ms-3">
          <NavDropdown.Item as={Link} to="/all-petrol" className="text-dark me-3">All Petrol</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/all-diesel" className="text-dark me-3">All Diesel</NavDropdown.Item>
        </NavDropdown>
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
      {shouldShowSearchBarAllPetrol && (
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
