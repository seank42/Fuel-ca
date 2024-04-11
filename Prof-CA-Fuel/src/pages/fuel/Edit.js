import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/Form";
import Input from "../../components/Input";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fuel_type: "",
    price: "",
    rating: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost/api/fuels/${id}`)
      .then((response) => {
        setForm(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
      let token = localStorage.getItem("token");

      axios
        .put(`http://localhost/api/fuels/${id}`, form, {
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
          setErrors(err.response?.data); // Adjust error handling here
        });
    }
  };

  return (
    <>
      <h2 className="mb-3 ml-3 text-lg">
        <b>Edit Fuel </b>
      </h2>
      <Form
        className="d-flex flex-column align-items-center space-y-4 max-w-2xl mx-auto pb-12 pt-4 border border-secondary"
        onSubmit={submitForm}
      >
        <Input
          className="form-control"
          type="text"
          onChange={handleForm}
          value={form.fuel_type}
          name="fuel_type"
          placeholder="Fuel Type"
        />
        <span className="text-danger">{errors?.fuel_type?.message}</span>
        <Input
          className="form-control"
          type="text"
          onChange={handleForm}
          value={form.price}
          name="price"
          placeholder="Price"
        />
        <span className="text-danger">{errors?.price?.message}</span>
        <Input
          className="form-control"
          type="text"
          onChange={handleForm}
          value={form.rating}
          name="rating"
          placeholder="Rating"
        />
        <span className="text-danger">{errors?.rating?.message}</span>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </>
  );
};

export default Edit;
