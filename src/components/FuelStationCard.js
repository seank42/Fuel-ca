import React from "react";

const FuelStationCard = ({ title, description, longitude, latitude }) => {
  

  return (
    <div className=" mb-3 h-100" style={{ maxHeight: "8rem", minHeight:"8rem" }}>
      <div className="card-body text-center">
        <h5 className="card-title text-capitalize pt-3">{title}</h5>
        <p className="card-text ms-10">{description}</p>
      </div>
    </div>
  );
};

export default FuelStationCard;
