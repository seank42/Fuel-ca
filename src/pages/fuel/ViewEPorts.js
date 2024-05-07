import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = { lat: 53.2782, lng: -6.1397 };

function ViewEPorts() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAuHnwnyAwPe4AjNkWs0KJs49umDZuyhjo"
  });

  const [fuelStations, setFuelStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
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
          onClick={() => {
            setSelectedStation(station);
          }}
        />
      ))}
      {/* Hard coded marker for IADT coordinates */}
      <Marker
        position={{ lat: 53.2782, lng: -6.1397 }} // IADT coordinates
        icon={{
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Blue marker icon
        }}
        title="IADT" // Set the title of the marker for IADT
      />
      {selectedStation && (
        <InfoWindow
          position={{ lat: selectedStation.latitude, lng: selectedStation.longitude }}
          onCloseClick={() => {
            setSelectedStation(null);
          }}
        >
          <div>
            <h3>{selectedStation.title}</h3>
            <p>Description: {selectedStation.description}</p>
            <p>Longitude: {selectedStation.longitude}</p>
            <p>Latitude: {selectedStation.latitude}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(ViewEPorts);
