import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import FuelCard from '../../components/FuelCard';

function FuelDelete({ fuel, deleteFuel }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteFuel(fuel);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow} className="btn-sm">
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {fuel.fuel_type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`Are you sure you want to delete ${fuel.fuel_type} fuel?`}</p>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

const Index = ({ search }) => {
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredFuels, setFilteredFuels] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null); 

  useEffect(() => {
    const fetchFuels = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost/api/fuels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFuels(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fuels:', error);
        setLoading(false);
      }
    };

    fetchFuels();
  }, []);

  useEffect(() => {
    filterFuels();
  }, [fuels, selectedFuelType, selectedPriceRange, search]); 
  const filterFuels = () => {
    let filtered = [...fuels];
    if (selectedFuelType !== null) {

      if(selectedFuelType === "All"){
        filtered = [...fuels];
      }
      else {
        filtered = filtered.filter(fuel => fuel.fuel_type === selectedFuelType);
      }

    }
    if (selectedPriceRange !== null) {
      if(selectedPriceRange !== null){
        filtered = filtered.filter(fuel => fuel.price >= selectedPriceRange[0] && fuel.price <= selectedPriceRange[1]);
      }
    }
    if (search && search.length > 1) {
      filtered = filtered.filter(fuel => fuel.fuelStation.title.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredFuels(filtered);
  };

  const handleDeleteFuel = async (fuelToDelete) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost/api/fuels/${fuelToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFuels(prevFuels => prevFuels.filter(fuel => fuel.id !== fuelToDelete.id));
    } catch (error) {
      console.error('Error deleting fuel:', error);
    }
  };

  const handleFuelTypeChange = (value) => {
    setSelectedFuelType(value);
  };

  const handlePriceRangeChange = (value) => {
    setSelectedPriceRange(value);
  };

  if (loading) return 'Loading...';

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="pb-2 mb-2 text-xl">
          <b>Fuels</b>
        </h2>
        <DropdownButton
          variant="outline-primary"
          id="dropdown-fuel-type"
          title="Filter by Fuel Type"
          className="dropdown"
        >
          {fuelType.map((type, index) => (
            <Dropdown.Item key={index} onClick={() => handleFuelTypeChange(type)}>{type}</Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          variant="outline-primary"
          id="dropdown-price-range"
          title="Filter by Price Range"
          className="dropdown"
        >
          {priceRanges.map((range, index) => (
            <Dropdown.Item key={index} onClick={() => handlePriceRangeChange(range.value)}>{range.label}</Dropdown.Item>
          ))}
        </DropdownButton>
        <Link className="btn btn-outline-success" to="/fuel/create"> Create </Link>
      </div>
      <div className="row mt-5">
        {filteredFuels.length > 0 ? (
          filteredFuels.map((fuel, i) => (
            <div key={i} className="col-md-4 mb-3">
              <Link to={`/fuel/${fuel.id}`} className="text-dark text-decoration-none">
                <FuelCard fuel={fuel} />
              </Link> 
              <div className="pt-3 pr-3">
              <FuelDelete fuel={fuel} deleteFuel={handleDeleteFuel} />
              </div>
              
            </div>
          ))
        ) : (
          <p>No fuels found.</p>
        )}
      </div>
    </div>
  );
};

const fuelType = ["Petrol", "Diesel", "Electric", "All"];

const priceRanges = [
  { label: '$0 - $50', value: [0, 50] },
  { label: '$50 - $100', value: [50, 100] },
  { label: 'All', value: null }, ,
];

export default Index;
