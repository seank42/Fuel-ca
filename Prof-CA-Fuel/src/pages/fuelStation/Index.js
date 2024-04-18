import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FuelStationCard from "../../components/FuelStationCard";
import { deleteFuelStationWithFuels } from "../../utils/deleteFuelStation";
import AddFavorite from "../favourites/AddFavourites";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StaticExample({fuelStation, deleteFuelStation}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteFuelStation(fuelStation);
    document.getElementById(`fuelStation.${fuelStation.id}`).close();
  };

  return (
    <>
     <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
         <Modal.Dialog>
        <Modal.Header closeButton >
          <Modal.Title>Delete {fuelStation.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <p>{`Are you sure you want to delete ${fuelStation.title} ?`}</p>
         <button onClick={handleDelete} class="btn btn-light btn-outline-dark">
                Yes
              </button>
        </Modal.Body>
      </Modal.Dialog></Modal>
     
    </>
  );
}


// Define the FuelStationAlerts component
const FuelStationAlerts = ({ fuelStation, deleteFuelStation }) => {
  const handleDelete = () => {
    deleteFuelStation(fuelStation);
    document.getElementById(`fuelStation.${fuelStation.id}`).close();
  };
console.log(fuelStation ,"fuelStation")
  return (
    <>
    
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Launch static backdrop modal
    </button>
    
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};
    //
    // <> 

    /* <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#fuelStation.${fuelStation.id}`}>
  Delete
</button>
     
      <dialog id={`fuelStation.${fuelStation.id}`} class="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Fuel Station</h5>
              <button
                type="button"
                class="btn-close"
                onClick={() =>
                  document.getElementById(`fuelStation.${fuelStation.id}`).close()
                }
              ></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this fuel station?</p>
            </div>button 
            <div class="modal-footer">
              <onClick={handleDelete} class="btn btn-danger">
                Yes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                onClick={() =>
                  document.getElementById(`fuelStation.${fuelStation.id}`).close()
                }
              >
                No
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
// }; */

// Define the Index component
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
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="pb-2 mb-2 text-xl">
          <b>Fuel Stations</b>
        </h2>
        <Link className="btn btn-outline-success" to="/fuelStation/create">
          Create
        </Link>
      </div>
      <div className="row mt-5">
        {filteredFuelStations?.length > 0 ? (
          filteredFuelStations.map((fuelStation, i) => (
            <div key={i} className="col-md-4 mb-3">
              <Link to={`/fuelStation/${fuelStation.id}`} className="text-dark text-decoration-none">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{fuelStation.title}</h5>
                    <p className="card-text">{fuelStation.description}</p>
                  </div>
                 
                </div>
              </Link>
              <StaticExample
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
