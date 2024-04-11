import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/Register';
import FuelIndex from './pages/fuel/Index';
import AllPetrol from './pages/fuel/AllPetrol';
import AllDiesel from './pages/fuel/AllDiesel';
import PageNotFound from './pages/PageNotFound';
import TheNavbar from './components/Navbar';
import FuelCreate from './pages/fuel/Create'; 
import FuelEdit from './pages/fuel/Edit'; 
import FuelShow from './pages/fuel/Show'
import ViewEPorts  from './pages/fuel/ViewEPorts'; 
import FuelStationCreate from './pages/fuelStation/Create';
import FuelStationEdit from './pages/fuelStation/Edit';
import FuelStationIndex from './pages/fuelStation/Index';
import FuelStationShow from './pages/fuelStation/Show';



function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [search, setSearch] = useState("");

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };
  
  const onHandleChange = (e) => {
    setSearch(e.target.value);
  };
  

  return (
    <Router>
      <TheNavbar authenticated={authenticated} onAuthenticated={onAuthenticated} onHandleChange={onHandleChange} search={search}/>
      <Routes>
        <Route path="/home" element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated} onHandleChange={onHandleChange} search={search}/>} />
        <Route path="/" element={<LoginForm authenticated={authenticated} onAuthenticated={onAuthenticated} onHandleChange={onHandleChange}/>} />
        <Route path="/register" element={<RegisterForm authenticated={authenticated} onAuthenticated={onAuthenticated} onHandleChange={onHandleChange}/>} />
        <Route path="/fuel" element={<FuelIndex authenticated={authenticated} onAuthenticated={onAuthenticated} onHandleChange={onHandleChange}/>} />
        <Route path="/all-petrol" element={<AllPetrol authenticated={authenticated} onAuthenticated={onAuthenticated} onHandleChange={onHandleChange} search={search}/>} />
        <Route path="/all-diesel" element={<AllDiesel authenticated={authenticated} onAuthenticated={onAuthenticated} onHandleChange={onHandleChange} search={search}/>} />
        <Route path="/show" element={<FuelShow />} />
        <Route path="/create-station" element={<FuelCreate />} /> 
        <Route path="/edit-station/:id" element={<FuelEdit />} />
        <Route path="/view-EPorts" element={<ViewEPorts />} />
        <Route path="/create" element={<FuelCreate />} /> 
        <Route path="/edit-station" element={<FuelEdit />} />
        <Route path="/view-EPorts" element={<ViewEPorts/>} />
        <Route path="/fuelstation" element={<FuelStationIndex authenticated={authenticated} onAuthenticated={onAuthenticated} onHandleChange={onHandleChange} search={search}/>} />
        <Route path="/fuelstation/:id" element={<FuelStationShow authenticated={authenticated} onAuthenticated={onAuthenticated} onHandleChange={onHandleChange}/>} />
        <Route path="/fuelstation/create" element={<FuelStationCreate/>} />
        <Route path="/fuelstation/:id/edit" element={<FuelStationEdit/>} />
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;