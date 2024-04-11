import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteButton from "../../components/DeleteButton";


const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fuelStation, setFuelStation] = useState(null);

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
      <div className="mt-4 ml-3">
        <Link to={`/fuelStation/${id}/edit`}>
          <button className="btn btn-outline btn-info mr-3">Edit</button>
        </Link>
        <DeleteButton/>
      </div>
    </>
  );
};

export default Show;
