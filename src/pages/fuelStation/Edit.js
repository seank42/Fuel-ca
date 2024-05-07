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
    title: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get(`http://localhost/api/fuelStations/${id}`,
      {  headers: {
        Authorization: `Bearer ${token}`,
      }} 
    )
      
      .then((response) => {
        setForm(response.data.data);
        console.log(response, "response")
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

    if (isRequired(["title", "description", "latitude", "longitude"])) {
      let token = localStorage.getItem("token");

      axios
        .put(`http://localhost/api/fuelStations/${id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          navigate("/fuelStation");
        })
        .catch((err) => {
          console.error(err);
          setErrors(err.response?.data); // Adjust error handling here
        });
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
      <h2 className="pb-4 mb-2 text-xl">
        <b>Edit Fuel Station</b>
      </h2>
      </div>
      <Form
        className="d-flex flex-column align-items-center space-y-4 max-w-2xl mx-auto pb-12 pt-4 border border-secondary"
        onSubmit={submitForm}
        method="POST"
      >
        <Input
          className="form-control"
          type="text"
          onChange={handleForm}
          value={form.title}
          name="title"
          placeholder="Title"
        />
        <span className="text-danger">{errors?.title?.message}</span>
        <Input
          className="form-control"
          type="text"
          onChange={handleForm}
          value={form.description}
          name="description"
          placeholder="Description"
        />
        <span className="text-danger">{errors?.description?.message}</span>
        <Input
          className="form-control"
          type="text"
          onChange={handleForm}
          value={form.latitude}
          name="latitude"
          placeholder="Latitude"
        />
        <span className="text-danger">{errors?.latitude?.message}</span>
        <Input
          className="form-control"
          type="text"
          onChange={handleForm}
          value={form.longitude}
          name="longitude"
          placeholder="Longitude"
        />
        <span className="text-danger">{errors?.longitude?.message}</span>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
      </div>
    </>
  );
};

export default Edit;
