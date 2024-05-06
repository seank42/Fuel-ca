import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Show = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [fuelStation, setFuelStation] = useState(null);
  const [fuels, setFuels] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios
      .get(`http://localhost/api/fuelStations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuelStation(response.data.data);
        setFuels(response.data.data.fuels); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [id]);

  if (!fuelStation) return <h3>Loading fuel station..</h3>;

  return (
    <>
      <h2 className="text-xl mb-5 ml-5 mt-5 pt-5">
        <b>{fuelStation.title}</b>
        <div className="mt-4 ml-3">
        <Link to={`/fuelStation/${id}/edit`}>
          <button className="btn btn-outline-primary mr-3">Edit</button>
        </Link>
      </div>
      </h2>
  
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card border-0 shadow">
              <div className="card-body">
                <p className="card-text pb-3">
                  <b>Description: </b>
                  {fuelStation.description}
                </p>
                <p className="card-text pb-3">
                  <b>Longitude: </b>
                  {fuelStation.longitude}
                </p>
                <p className="card-text pb-3">
                  <b>Latitude: </b>
                  {fuelStation.latitude}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-5 mb-3 ml-5">Avaliable Fuel:</h3>
      {loading ? (
        <h3>Loading fuels...</h3>
      ) : (
        <div className="container">
          {fuels.map((fuel) => (
            <div key={fuel.id} className="row mb-3">
              <div className="col-lg-6 mx-auto">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <p className="card-text pb-3">
                      <b>Fuel Type: </b>
                      {fuel.fuel_type}
                    </p>
                    <p className="card-text pb-3">
                      <b>Price: </b>
                      {fuel.price}
                    </p>
                    <p className="card-text pb-3">
                      <b>Rating: </b>
                      {fuel.rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Show;
