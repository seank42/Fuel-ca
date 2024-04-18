import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Table from 'react-bootstrap/Table';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = { lat: 53.1935014, lng: -6.1913295 };

const Home = () => {
  
  const [fuelStations, setFuelStations] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAuHnwnyAwPe4AjNkWs0KJs49umDZuyhjo"
  });

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
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost/api/fuelStations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuelStations(response.data.data);
        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);


  const tableStructure = () => {
    return (
      <Table responsive className="custom-table bg-light">
        <thead>
          <tr>
            {fuels.map((fuel, index) => (
              <th key={index} style={{ borderTop: '1px solid black', borderLeft: '1px solid black' }} className="vertical-line">Fuel Type: {fuel.fuel_type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {fuels.map((fuel, index) => (
              <td key={index} style={{ borderLeft: '1px solid black' }}>Price : {fuel.price}</td>
            ))}
          </tr>
          <tr>
            {fuels.map((fuel, index) => (
              <td key={index} style={{ borderLeft: '1px solid black' }}>Rating: {fuel.rating}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <div className='bg-light'>
      <h1 className="text-center text-dark">Welcome to Fuel Finder</h1>
      <h2 className="text-start text-dark">Fuel Prices</h2>
      {/* Render the tableStructure */}
      {loading ? <p>Loading...</p> : tableStructure()}
          

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
        >
          {fuelStations.map((fuelstation, index) => (
            <Marker key={index} position={{ lat: fuelstation.latitude, lng: fuelstation.longitude }} />
          ))}
        </GoogleMap>
      )}

      {/* Render the NewsCardRow */}
      <h2 className="text-start text-dark">Latest News</h2>
      <NewsCard />
    </div>
  );
};

export default Home;
