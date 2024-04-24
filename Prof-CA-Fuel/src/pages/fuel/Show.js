import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteButton from "../../components/DeleteButton";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fuel, setFuel] = useState(null); 

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios
      .get(`http://localhost/api/fuels/${id}`, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuel(response.data.data); 
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [id]);

  if (!fuel) return <h3>Loading fuel...</h3>; 

  return (
    <>
      <h2 class="text-xl mb-5 ml-5 mt-5 pt-5">
        <b>Fuel</b> 
      </h2>
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mx-auto">
            <div class="card border-0 shadow">
              <div class="card-body">
                <p class="card-text pb-3">
                  <b>Fuel Type: </b>
                  {fuel.fuel_type} 
                </p>
                <p class="card-text pb-3">
                  <b>price: </b>
                  {fuel.price} 
                </p>
                <p class="card-text pb-3">
                  <b>rating: </b>
                  {fuel.rating} 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 ml-3">
        <Link to={`/fuel/${id}/edit`}> 
          <button className="btn btn-outline-primary mr-3">Edit</button>
        </Link>
      </div>
    </>
  );
};

export default Show;
