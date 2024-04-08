import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

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
        // Redirect to the home page or wherever you want
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
    <Container className="lg-center d-flex justify-content-center align-items-center">
      <div className="text-center cover-full bg-primary pb-4 pt-4">
        <h2 className="text-4xl text-white">User Register</h2>
      </div>
      <div className="flex flex-col items-center space-y-8 mt-12">
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={form.name}
              onChange={handleForm}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={form.email}
              onChange={handleForm}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
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
          {errMessage && <Alert variant="danger">{errMessage}</Alert>}
        </Form>

        <div>
          <Link className="underline text-blue-500" to="/login">
            Have an account? Login here.
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default RegisterForm;
