import React, { useState, useEffect } from "react";
import axios from "axios";

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost/api/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setFavourites(response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  const removeFromFavourites = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost/api/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchFavourites();
    } catch (error) {
      console.error("Error removing from favourites:", error);
    }
  };

  return (
    <div>
      <h1>Favorite Fuel Stations</h1>
      <div className="favourite-list">
        {favourites.map((fuelStation) => (
          <div key={fuelStation.id}>
            <h2>{fuelStation.title}</h2>
            <p>{fuelStation.description}</p>
            <button onClick={() => removeFromFavourites(fuelStation.id)}>Remove from Favourites</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourite;
