import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

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

  const handleClick = () => {
    axios
      .post(`http://localhost/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response.data);
        onAuthenticated(true, response.data.token);
        navigate("/home");
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
      <div class="container mt-5">
        <div class="text-center">
          <h2>User Register</h2>
        </div>
        <div class="d-flex flex-column align-items-center mt-4">
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={form.name}
                onChange={handleForm}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={form.email}
                onChange={handleForm}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleForm}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleClick}>
              Submit
            </Button>
          </Form>
          <p style={errStyle}>{errMessage}</p>
          <div>
            <Link to="/">Have an account? Login here.</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
