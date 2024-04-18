import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = { lat: 53.4494762, lng: -7.5029786 };

function ViewEPorts() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:  "AIzaSyAuHnwnyAwPe4AjNkWs0KJs49umDZuyhjo"
  });

  const [fuelStations, setFuelStations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {fuelStations.map((station, index) => (
        <Marker
          key={index}
          position={{ lat: station.latitude, lng: station.longitude }}
        />
      ))}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(ViewEPorts);
