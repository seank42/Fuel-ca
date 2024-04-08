import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const LoginForm = ({ onAuthenticated, navigateToCourses }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errMessage, setErrMessage] = useState("");

  const handleClick = () => {
    axios
      .post(`http://localhost/api/auth/login`, {
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response.data);
        onAuthenticated(true, response.data.token);
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
        <h2 className="text-4xl text-white">User Login</h2>
      </div>
      <div className="flex flex-col items-center space-y-8 mt-12">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
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
          <Link className="text-blue-500" to="/register">
            Don't have an account? Register here.
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
