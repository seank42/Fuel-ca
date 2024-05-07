import axios from 'axios';

export async function deleteFuel(fuelCurrent, navigate, redirect = false) {
    console.log("running delete fuel entry", redirect);
    
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost/api/fuels/${fuelCurrent.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then((response) => {
        redirect ? navigate('/fuels') : window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
}
