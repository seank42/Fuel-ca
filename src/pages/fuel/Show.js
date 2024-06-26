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
    <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-center">
    <h2 className="pb-4 mb-2 text-xl">
        <b className="pb-2 mb-2 text-xl">Fuel</b> 
      </h2>
    </div>
      <div className="mt-4 ml-3">
        <Link to={`/fuel/${id}/edit`}> 
          <button className="btn btn-outline-primary mr-3">Edit</button>
        </Link>
      </div>
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
      </div>
    </>
  );
};

export default Show;
