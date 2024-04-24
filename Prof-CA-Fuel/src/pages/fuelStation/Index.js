import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FuelStationCard from "../../components/FuelStationCard";
import { deleteFuelStationWithFuels } from "../../utils/deleteFuelStation";

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
    <Button variant="outline-danger" onClick={handleShow}>
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

  const handleFavouriteFuelStation = async (fuelStationId) => {
    const token = localStorage.getItem('token');
    try {
     const response = await axios.post(`http://localhost/api/favorites/${fuelStationId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)

    } catch (error) {
      console.error("Problem favouriting fuel station:", error);
    }
  };

  const handleUnfavouriteFuelStation = async (fuelStationId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost/api/favorites/${fuelStationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axios.get(`http://localhost/api/fuelStations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFuelStations(response.data.data);
    } catch (error) {
      console.error("Problem unfavouriting fuel station:", error);
    }
  };

  if (loading) return "Loading...";

  return (
    <div className="container mt-5"> 
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="pb-2 mb-2 text-xl"> 
          <b>Fuel Stations</b>
        </h2>
        <Link className="btn btn-outline-success" to="/fuelstation/create">
          Create
        </Link>
      </div>
      <div className="row mt-5">
        {filteredFuelStations?.length > 0 ? (
          filteredFuelStations.map((fuelStation, i) => (
            <div key={i} className="col-md-4 mb-3"> 
              <Link to={`/fuelStation/${fuelStation.id}`} className="text-dark text-decoration-none"> 
                <FuelStationCard
                  title={fuelStation.title}
                  description={fuelStation.description}
                  longitude={fuelStation.longitude}
                  latitude={fuelStation.latitude}
                />
              </Link>
              <div>
                {authenticated && (
                  <Button
                    onClick={() => handleFavouriteFuelStation(fuelStation.id)}
                    variant="outline-info"
                  >
                    Favourite
                  </Button>
                )}
                {authenticated && (
                  <Button
                    onClick={() => handleUnfavouriteFuelStation(fuelStation.id)}
                    variant="outline-warning"
                  >
                    Unfavourite
                  </Button>
                )}
              </div>
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
