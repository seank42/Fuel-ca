import axios from 'axios';

export async function deleteFuelStationWithFuels(fuelStation, navigate, redirect = false) {
    console.log("running delete fuel station", redirect);
    
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost/api/fuelStations/${fuelStation.id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        redirect ? navigate('/fuelstations') : window.location.reload();
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}
