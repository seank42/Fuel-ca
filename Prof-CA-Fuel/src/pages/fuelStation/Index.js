import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FuelStationCard from "../../components/FuelStationCard";
import { deleteFuelStationWithFuels } from "../../utils/deleteFuelStation";
import AddFavorite from "../favourites/AddFavourites";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FuelStationDelete({fuelStation, deleteFuelStation}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteFuelStation(fuelStation);
    handleClose();
  };

  return (
    <>
    <Button variant="danger" onClick={handleShow}>
      Delete
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {fuelStation.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`Are you sure you want to delete ${fuelStation.title} ?`}</p>
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

const Index = ({ search, authenticated, resource }) => {
  const [fuelStations, setFuelStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredFuelStations, setFilteredFuelStations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost/api/fuelStations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuelStations(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search?.length <= 1) {
      setFilteredFuelStations(fuelStations);
    } else {
      let filter = fuelStations.filter((fuelStation) => {
        return fuelStation?.title?.toLowerCase().includes(search?.toLowerCase());
      });
      setFilteredFuelStations(filter);
    }
  }, [fuelStations, search]);

  const handleDeleteFuelStation = (fuelStation) => {
    deleteFuelStationWithFuels(fuelStation);
  };

  if (loading) return "Loading...";

  return (
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="pb-2 mb-2 text-xl">
          <b>Fuel Stations</b>
        </h2>
        <Link class="btn btn-outline-success" to="/fuelStation/create">
          Create
        </Link>
      </div>
      <div class="row mt-5">
        {filteredFuelStations?.length > 0 ? (
          filteredFuelStations.map((fuelStation, i) => (
            <div key={i} class="col-md-4 mb-3">
              <Link to={`/fuelStation/${fuelStation.id}`} class="text-dark text-decoration-none">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{fuelStation.title}</h5>
                    <p class="card-text">{fuelStation.description}</p>
                  </div>
                 
                </div>
              </Link>
              <FuelStationDelete
                    fuelStation={fuelStation}
                    deleteFuelStation={handleDeleteFuelStation}
                  />
            </div>
          ))
        ) : (
          <p>No fuel stations found.</p>
        )}
      </div>
    </div>
  );
};

export default Index;
