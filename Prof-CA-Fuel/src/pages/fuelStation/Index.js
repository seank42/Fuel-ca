// third party imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//components
import FuelStationCard from "../../components/FuelStationCard";

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
    if (search?.length<= 1) {
      setFilteredFuelStations(fuelStations);
    } else {
      let filter = fuelStations.filter((fuelStation) => {
        return fuelStation?.title?.toLowerCase().includes(search?.toLowerCase());
      });
      setFilteredFuelStations(filter);
    }
  }, [fuelStations, search]);

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
                <FuelStationCard
                  title={fuelStation.title}
                  points={fuelStation.description}
                  authenticated={authenticated}
                />
               
              </Link>
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
