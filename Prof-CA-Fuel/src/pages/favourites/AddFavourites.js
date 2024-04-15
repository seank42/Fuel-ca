import React, { useState, useEffect } from "react";
import axios from "axios";

const AddFavorite = () => {
  const [fuelStations, setFuelStations] = useState([]); // State to store the fuel stations
  const [selectedFuelStation, setSelectedFuelStation] = useState(""); // State to store the selected fuel station

  useEffect(() => {
    // Fetch fuel stations data from the backend API
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost/api/fuelStations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuelStations(response.data); // Set the fuel stations in state
      })
      .catch((error) => {
        console.error("Error fetching fuel stations:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFuelStation) {
      console.error("Please select a fuel station");
      return;
    }

    let token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost/api/favorites",
        {
          fuel_station_id: selectedFuelStation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Favorite added successfully:", response.data);
        // Optionally, you can perform additional actions after adding the favorite, such as updating the UI or showing a success message.
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
        // Optionally, handle errors here, such as displaying an error message to the user.
      });
  };

  return (
    <div>
      <h2>Add Favorite</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropdown/select element for selecting fuel stations */}
        <select value={selectedFuelStation} onChange={(e) => setSelectedFuelStation(e.target.value)}>
          <option value="">Select Fuel Station</option>
          {/* Check if fuelStations is an array before mapping over it */}
          {Array.isArray(fuelStations) && fuelStations.map((fuelStation) => (
            <option key={fuelStation.id} value={fuelStation.id}>
              {fuelStation.name} - {fuelStation.location}
            </option>
          ))}
        </select>
        <button type="submit">Add Favorite</button>
      </form>
    </div>
  );
};

export default AddFavorite;
