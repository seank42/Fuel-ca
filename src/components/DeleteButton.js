// imported necessary dependencies
import axios from "axios"; // the library for making HTTP requests
import { useNavigate } from "react-router-dom"; // the navigation utilities for React
import { useState } from "react"; // useState management for functional components

// this defines the DeleteButton component
const DeleteButton = ({ id, onClick }) => {
  // useState to manage loading state during deletion
  const [isLoading, setLoading] = useState(false);
  // this gets navigation function from React Router DOM
  const navigate = useNavigate();

  // this function is to handle the deletion process
  const onDelete = () => {
    // this is setting the loading state to true to indicate ongoing deletion process
    setLoading(true);
    // this is retrieving the authentication token from local storage
    const token = localStorage.getItem("token");
    // this makes a delete request to the api
    axios
      .delete(
        `
        http://localhost/api/fuelStations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // this logs the response data and perform additional actions if needed
        console.log(response.data);
        window.location.reload();
        // the onClick function if provided, otherwise navigate to courses index
        if (onClick) {
          onClick();
        } else {
          navigate("/courses");
        }
      })
      .catch((err) => {
        // this is logging and handling errors if they occur during the deletion
        console.error(err.response.data);
      });
  };
  // renders a button based on the loading state
  return (
  <button class="btn btn-outline btn-error btn-group-sm btn-white" onClick={onDelete}>
  {isLoading ? "Deleting..." : "Delete"}
</button>
  );
};

export default DeleteButton;