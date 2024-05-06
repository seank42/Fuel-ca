import React from "react";

const FuelStationCard = ({ title, description, longitude, latitude }) => {
  

  return (
    <div className="card mb-3" style={{ maxWidth: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title text-capitalize">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default FuelStationCard;
