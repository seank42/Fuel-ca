import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteButton from "../../components/DeleteButton";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fuel, setFuel] = useState(null); // Changed variable name from fuelStation to fuel

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios
      .get(`http://localhost/api/fuels/${id}`, { // Changed API endpoint to fetch fuel details
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuel(response.data.data); // Changed state variable from fuelStation to fuel
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [id]);

  if (!fuel) return <h3>Loading fuel...</h3>; // Changed loading message from "Loading fuel station.." to "Loading fuel..."

  return (
    <>
      <h2 className="text-xl mb-5 ml-5 mt-5 pt-5">
        <b>Fuel</b> 
      </h2>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card border-0 shadow">
              <div className="card-body">
                <p className="card-text pb-3">
                  <b>Fuel Type: </b>
                  {fuel.fuel_type} 
                </p>
                <p className="card-text pb-3">
                  <b>price: </b>
                  {fuel.price} 
                </p>
                <p className="card-text pb-3">
                  <b>rating: </b>
                  {fuel.rating} 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 ml-3">
        <Link to={`/fuel/${id}/edit`}> 
          <button className="btn btn-outline btn-info mr-3">Edit</button>
        </Link>
      </div>
    </>
  );
};

export default Show;
