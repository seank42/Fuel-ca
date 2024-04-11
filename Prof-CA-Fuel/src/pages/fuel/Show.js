import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fuelStation, setFuelStation] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get(`https://college-api.vercel.app/api/fuelStations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuelStation(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!fuelStation) return <h3>Loading fuel station..</h3>;

  return (
    <>
      <h2 className="text-xl mb-5 ml-5 mt-5 pt-5">
        <b>{fuelStation.title}</b>
      </h2>
      <div className="flex flex-col-2 ml-5 mr-5 m-5 border border-zinc-300 p-5 ">
        <div className=" text-left lg-center ">
          <div className="bg-white ">
            <div className="p-2 text-lg">
              <p className="pb-3">
                <b>Description: </b>
                {fuelStation.description}
              </p>
              <p className="pb-3">
                <b>Latitude: </b>
                {fuelStation.latitude}
              </p>
              <p className="pb-3">
                <b>Longitude: </b>
                {fuelStation.longitude}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-2 mt-4 ml-3 ">
        <Link to={`/fuelStations/${id}/edit`}>
          <button className="btn btn-outline btn-info mr-3">Edit</button>
        </Link>

      </div>
    </>
  );
};

export default Show;
