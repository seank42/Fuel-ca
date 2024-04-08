import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fuel_type: "",
    price: "",
    rating: "",
  });

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isRequired = (fields) => {
    let include = true;
    setErrors({});

    fields.forEach((field) => {
      if (!form[field]) {
        include = false;
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} is required`,
          },
        }));
      }
    });

    return include;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (isRequired(["fuel_type", "price", "rating"])) {
      const token = localStorage.getItem("token");

      axios
        .post(`http://localhost/api/fuels`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          navigate("/home");
        })
        .catch((err) => {
          console.error(err);
          setErrors(err.response.data.err);
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-3 ml-3 text-lg">
            <b>Create Fuel</b>
          </h2>
          <Form
            className="flex flex-col items-center space-y-4 max-w-2xl mx-auto pb-12 pt-4 border border-zinc-300"
            onSubmit={submitForm}
            method="POST"
          >
            <Form.Group controlId="fuel_type">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Control
                type="text"
                onChange={handleForm}
                value={form.fuel_type}
                name="fuel_type"
                className="border border-black rounded pr-5 pl-5"
              />
              <Form.Text className="text-red-600">{errors?.fuel_type?.message}</Form.Text>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                onChange={handleForm}
                value={form.price}
                name="price"
                className="border border-black rounded pr-5 pl-5"
              />
              <Form.Text className="text-red-600">{errors?.price?.message}</Form.Text>
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={5}
                onChange={handleForm}
                value={form.rating}
                name="rating"
                className="border border-black rounded pr-5 pl-5"
              />
              <Form.Text className="text-red-600">{errors?.rating?.message}</Form.Text>
            </Form.Group>

            <Button type="submit" className="btn btn-active">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
