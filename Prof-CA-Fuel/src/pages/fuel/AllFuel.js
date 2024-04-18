import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FuelCard from "../../components/FuelCard";

const Index = ({ search, authenticated, resource }) => {
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredFuels, setFilteredFuels] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost/api/fuels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuels(response.data.data);
        setLoading(false);

      })
      .catch((err) => {
        console.error("Error fetching fuels:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search?.length <= 1) {
      setFilteredFuels(fuels);
    } else {
      let filter = fuels.filter((fuel) => {
        return fuel?.fuel_type?.toLowerCase().includes(search?.toLowerCase());
      });
      setFilteredFuels(filter);
    }
  }, [fuels, search]);

  if (loading) return "Loading...";

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="pb-2 mb-2 text-xl">
          <b>Fuel</b>
        </h2>
        <Link className="btn btn-outline-success" to="/fuel/create">
          Create
        </Link>
      </div>
      <div className="row mt-5">
        {filteredFuels?.length > 0 ? (
          filteredFuels.map((fuel, i) => (
            <div key={i} className="col-md-4 mb-3">
              <Link to={`/fuel/${fuel.id}`} className="text-dark text-decoration-none">
                <FuelCard
                  fuel_type={fuel.fuel_type}
                  price={fuel.price}
                  rating={fuel.rating}
                  authenticated={authenticated}
                />
               
              </Link>
            </div>
          ))
        ) : (
          <p>No fuels found.</p>
        )}
      </div>
    </div>
  );
};

export default Index;
