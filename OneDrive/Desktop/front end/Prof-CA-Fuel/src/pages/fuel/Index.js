import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Index = ({ authenticated }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(``)
      .then((response) => {
        setStations(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching stations.'); // Set error message
        setLoading(false); // Set loading to false on error as well
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!stations || stations.length === 0) return <p>No stations found.</p>;

  const stationsList = stations.map((fest) => (
    <div key={fest._id} className="mt-3">
      {authenticated ? (
        <p>
          <b>Title:</b>{' '}
          <Link to={`/stations/${fest._id}`}>{fest.title}</Link>
          {' '}
          <Link to={`/stations/${fest._id}/edit`}>Edit</Link>
        </p>
      ) : (
        <p>
          <b>Description:</b> {fest.description}
        </p>
      )}
    </div>
  ));

  return (
    <div className="container mt-5">
      <h1>All Stations</h1>
      {authenticated && (
        <div>
         
        
        </div>
      )}
      {stationsList}
    </div>
  );
};

export default Index;