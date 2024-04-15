import React from "react";

const FuelStationCard = (props) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title text-capitalize">{props.title}</h5>
        <p className="card-text"> {props.description}</p>
      </div>
    </div>
  );
};

export default FuelStationCard;
