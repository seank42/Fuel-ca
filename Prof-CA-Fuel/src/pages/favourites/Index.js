import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import DeleteFavorite from "./DeleteFavourites";
import AddFavorite from "./AddFavourites";
import FuelStationCard from "../../components/FuelStationCard";


const AllFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    let token = localStorage.getItem("token");
    axios.get("http://localhost/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  };

  // Function to handle adding a new favorite
  const handleAddFavorite = (newFavorite) => {
    setFavorites([...favorites, newFavorite]); // Update the favorites list with the newly added favorite
  };

  return (
    <div>
      <h2>All Favorites</h2>
      {favorites.map((favorite) => (
        <Card key={favorite.id} className="mb-3">
          <Card.Body>
            <Card.Title>{favorite.name}</Card.Title>
            <Card.Text>{favorite.description}</Card.Text>
          </Card.Body>
          <DeleteFavorite favoriteId={favorite.id} />
        </Card>
      ))}
      <AddFavorite onAdd={handleAddFavorite} />
      {favorites.map((favorite) => (
        <FuelStationCard key={favorite.id} fuelStation={favorite.fuel_station} />
      ))}
    </div>
  );
};

export default AllFavorites;
