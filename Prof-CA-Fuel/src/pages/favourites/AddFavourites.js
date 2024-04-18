// import React, { useState } from "react";
// import DeleteFavorite from "./DeleteFavourites";

// const AddFavorite = ({ fuelStations, onAddFavorite }) => {
//   const [selectedFuelStation, setSelectedFuelStation] = useState(""); 

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedFuelStation) {
//       console.error("Please select a fuel station");
//       return;
//     }

//     onAddFavorite(selectedFuelStation);
//     setSelectedFuelStation("");
//   };

//   return (
//     <div>
//       <h2>Add Favorite</h2>
//       <form onSubmit={handleSubmit}>
//         <select value={selectedFuelStation} onChange={(e) => setSelectedFuelStation(e.target.value)}>
//           <option value="">Select Fuel Station</option>
//           {fuelStations.map((fuelStation) => (
//             <option key={fuelStation.id} value={fuelStation.id}>
//               {fuelStation.title} - {fuelStation.description}
//             </option>
//           ))}
//         </select>
//         <button type="submit">Add Favorite</button>
//       </form>
//     </div>
//   );
// };

// export default AddFavorite;
