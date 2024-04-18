// imported axios for making HTTP requests
import axios from 'axios';

// the async function is used to delete a fuel station without considering fuels
export async function deleteFuelStationWithFuels(fuelStation, navigate, redirect = false) {
    console.log("running delete fuel station", redirect);
    
    // this is retrieving the authentication token from local storage
    const token = localStorage.getItem('token');

    // delete the fuel station itself
    axios.delete(`http://localhost/api/fuelStations/${fuelStation.id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        // redirect to fuel stations or reload the page based on the redirect parameter
        redirect ? navigate('/fuelstations') : window.location.reload();
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}
