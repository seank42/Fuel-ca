import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import FuelIndex from './pages/fuel/Index';
import AllPetrol from './pages/fuel/AllPetrol';
import AllDiesel from './pages/fuel/AllDiesel';
import PageNotFound from './pages/PageNotFound';
import TheNavbar from './components/Navbar';
import Create from './pages/fuel/Create'; 
import Edit from './pages/fuel/Edit'; 
import ViewEPorts  from './pages/fuel/ViewEPorts'; 


function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthenticated(true);
    }
  }, []);

  const handleAuthenticated = (auth) => {
    setAuthenticated(auth);
  };

  return (
    <Router>
      <TheNavbar authenticated={authenticated} onAuthenticated={handleAuthenticated} />
      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} />} />
        <Route path="/login" element={<LoginForm onAuthenticated={handleAuthenticated} />} />
        <Route path="/fuel" element={<FuelIndex authenticated={authenticated} />} />
        <Route path="/all-petrol" element={<AllPetrol />} />
        <Route path="/all-diesel" element={<AllDiesel />} />
        <Route path="/create-station" element={<Create />} /> 
        <Route path="/edit-station" element={<Edit />} />
        <Route path="/view-EPorts" element={<ViewEPorts />} />
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;