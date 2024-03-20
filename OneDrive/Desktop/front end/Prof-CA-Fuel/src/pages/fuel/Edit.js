import React, { useState } from 'react';
import Form from "../../components/Form";
import { Button } from 'react-bootstrap';

const Edit = () => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!e.target.stationName.value.trim()) {
      newErrors.stationName = "Station Name is required";
    }
    if (!e.target.petrolPrice.value.trim()) {
      newErrors.petrolPrice = "Petrol Price is required";
    }
    if (!e.target.dieselPrice.value.trim()) {
      newErrors.dieselPrice = "Diesel Price is required";
    }
    if (!e.target.stationRating.value.trim()) {
      newErrors.stationRating = "Station Rating is required";
    }
    setErrors(newErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission here
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
    <div className="text-center">
      <h1>Edit a Station</h1>
      <Form onSubmit={handleSubmit} errors={errors} />
      <Button variant="primary" type="submit">
       Edit
      </Button>
    </div>
  </div>
  );
};

export default Edit;