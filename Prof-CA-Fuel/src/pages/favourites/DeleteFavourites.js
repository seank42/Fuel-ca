import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const DeleteFavorite = ({ id, onDelete }) => {
  const handleDelete = () => {

    let token = localStorage.getItem("token");
    axios.delete(`http://localhost/api/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        onDelete(id);
      })
      .catch((error) => {
        console.error("Error deleting favorite:", error);
      });
  };

  return (
    <div>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteFavorite;
