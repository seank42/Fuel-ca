import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onAuthenticated }) => {
  const errStyle = {
    color: "red",
  };

  const [form, setForm] = useState({
    email: "GG@gmail.com",
    password: "secret123",
  });
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate(); // Hook to access navigation functions

  const handleClick = () => {
    axios
      .post(`/api/login`, { // Replace with your actual login endpoint
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response.data);
        onAuthenticated(true, response.data.token);
        navigate('/'); // Redirect to Home after successful login
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.message);
        setErrMessage(err.response.data.message);
      });
  };

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      Email:{" "}
      <input
        onChange={handleForm}
        type="text"
        name="email"
        value={form.email}
      />
      <br />
      Password:{" "}
      <input
        onChange={handleForm}
        type="password"
        name="password"
        value={form.password}
      />
      <br />
      <button onClick={handleClick}>Submit</button>
      <p style={errStyle}>{errMessage}</p>
    </>
  );
};

export default LoginForm;
