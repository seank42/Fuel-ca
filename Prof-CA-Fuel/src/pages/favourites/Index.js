// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AddFavorite from "../favourites/AddFavorite";

// const AllFavourites = () => {
//   const [fuelStations, setFuelStations] = useState([]);

//   useEffect(() => {
//     let token = localStorage.getItem("token");
//     axios
//       .get("http://localhost/api/fuelStations", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setFuelStations(response.data); 
//       })
//       .catch((error) => {
//         console.error("Error fetching fuel stations:", error);
//       });
//   }, []);

//   const handleAddFavorite = (selectedFuelStation) => {
//     console.log("Adding fuel station to favorites:", selectedFuelStation);
//   };

//   return (
//     <div>
//       <h1>Favorites Page</h1>
//       {/* <AddFavorite fuelStations={fuelStations} onAddFavorite={handleAddFavorite} /> */}
//     </div>
//   );
// };

// export default AllFavourites;
