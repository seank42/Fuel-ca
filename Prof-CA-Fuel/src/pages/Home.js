import React from 'react';
import NewsCard from '../components/NewsCard';
import Table from 'react-bootstrap/Table';
import { GoogleMap,  useJsApiLoader, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = { lat: 53.1935014, lng: -6.1913295 };

const Home = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAuHnwnyAwPe4AjNkWs0KJs49umDZuyhjo"
  });

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    // Clean up function if needed
  }, []);

  const tableStructure = () => {
    return (
      <Table responsive className="custom-table bg-light">
        <thead>
          <tr>
            {Array.from({ length: 6 }).map((_, index) => (
              <th key={index} style={{ borderTop: '1px solid black', borderLeft: '1px solid black' }} className="vertical-line">Station:</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index} style={{ borderLeft: '1px solid black' }}>Price :</td>
            ))}
          </tr>
          <tr>
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index} style={{ borderLeft: '1px solid black' }}>Rating: </td>
            ))}
          </tr>
          <tr>
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index} style={{ borderLeft: '1px solid black', borderBottom: '1px solid black' }}>Location:</td>
            ))}
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <div className='bg-light'>
      <h1 className="text-center text-dark">Welcome to Fuel Finder</h1>
      <h2 className="text-start text-dark">Petrol Prices</h2>
      {/* Render the tableStructure */}
      {tableStructure()}
          
      <h2 className="text-start text-dark">Diesel Prices</h2>
      {/* Render the tableStructure again for diesel prices */}
      {tableStructure()}

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={{ lat: 18.52045, lng: 73.856745 }} />
          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
        </GoogleMap>
      )}

      {/* Render the NewsCardRow */}
      <h2 className="text-start text-dark">Latest News</h2>
      <NewsCard />
    </div>
  );
};

export default Home;
