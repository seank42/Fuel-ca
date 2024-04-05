import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const Create = () => {
  const navigate = useNavigate();

  // useState to manage form errors and form data
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fuel_type: "",
    price: "",
    rating: "",
  });

  // this is the function to handle form input changes
  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // this function is to check if required fields exist in the form
  const isRequired = (fields) => {
    let include = true;
    setErrors({});

    fields.forEach((field) => {
      if (!form[field]) {
        include = false;
        // this sets the error messages for the missing fields
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

  // function that handles the form submission
  const submitForm = (e) => {
    e.preventDefault();

    // check if the required fields are present in the form
    if (isRequired(["fuel_type", "price", "rating"])) {
      // this gets the token from local storage
      let token = localStorage.getItem("token");

      // this makes a post request to create a new course
      axios
        .post(`http://localhost/api/fuels`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // this logs the response and navigate to the courses page
          console.log(response);
          navigate("/fuel");
        })
        .catch((err) => {
          console.error(err);
          console.log(err.response.data);
          setErrors(err.response.data.err);
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-3 ml-3 text-lg">
            <b>Create Course</b>
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
