import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "./Form";
import Input from "./Input";

const RegisterForm = ({ authenticated, onAuthenticated }) => {
  const errStyle = {
    color: "red",
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios
      .post(`http://localhost/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response.data);
        onAuthenticated(true, response.data.token);
        navigate("/view-EPorts");
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.message);
        setErrMessage(err.response.data.message);
      });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2>User Register</h2>
      </div>
      <div className="d-flex flex-column align-items-center mt-4">
        <Form onSubmit={handleClick}>
          <Input
            name="name"
            type="text"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Enter name"
          />
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleFormChange}
            placeholder="Enter email"
          />
          <Input
            name="password"
            type="password"
            value={form.password}
            onChange={handleFormChange}
            placeholder="Password"
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p style={errStyle}>{errMessage}</p>
        <div>
          <Link to="/">Have an account? Login here.</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
