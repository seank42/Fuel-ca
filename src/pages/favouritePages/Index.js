import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FuelStationCard from "../../components/FuelStationCard";
import Button from 'react-bootstrap/Button';

const Index = ({ authenticated }) => {
  const [favouriteFuelStations, setFavouriteFuelStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavouriteFuelStations = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost/api/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavouriteFuelStations(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Problem fetching favourite fuel stations:", error);
        setLoading(false);
      }
    };

    fetchFavouriteFuelStations();
  }, []);

  const handleUnfavouriteFuelStation = async (fuelStationId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost/api/favorites/${fuelStationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedFavouriteFuelStations = favouriteFuelStations.filter(station => station.id !== fuelStationId);
      setFavouriteFuelStations(updatedFavouriteFuelStations);
    } catch (error) {
      console.error("Problem unfavouriting fuel station:", error);
    }
  };

  if (loading) return "Loading...";

  return (
    <div className="container mt-5"> 
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="pb-2 mb-2 text-xl"> 
          <b>Favourite Fuel Stations</b>
        </h2>
      </div>
      <div className="row mt-5">
        {favouriteFuelStations.length > 0 ? (
          favouriteFuelStations.map((fuelStation, i) => (
            <div key={i} className="col-md-4 mb-3"> 
              <Link to={`/fuelStation/${fuelStation.id}`} className="text-dark text-decoration-none"> 
                <FuelStationCard
                  title={fuelStation.title}
                  description={fuelStation.description}
                  longitude={fuelStation.longitude}
                  latitude={fuelStation.latitude}
                />
              </Link>
              {authenticated && (
                <Button
                  onClick={() => handleUnfavouriteFuelStation(fuelStation.id)}
                  variant="outline-warning"
                >
                  Unfavourite
                </Button>
              )}
            </div>
          ))
        ) : (
          <p>No favourite fuel stations found.</p>
        )}
      </div>
    </div>
  );
};

export default Index;
