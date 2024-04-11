// imported axios for making HTTP requests
import axios from 'axios';

// the async function is used to delete a fuel entry
export async function deleteFuelStationEntry(fuelStationEntry, navigate, redirect = false) {
    console.log("running delete fuel station entry", redirect);
    
    // this is retrieving the authentication token from local storage
    const token = localStorage.getItem('token');

    // this is deleting the fuel entry
    axios.delete(`http://localhost/api/fuelStations/${fuelStationEntry.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then((response) => {
        // redirects to fuels or reload the page based on the redirect parameter
        redirect ? navigate('/fuelStations') : window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
}
