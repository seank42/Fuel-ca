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
  const [fuels, setFuels] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get(`http://localhost/api/fuels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setForm(response.data.data);
        console.log(response, "response");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch fuels data
    axios
      .get("http://localhost/api/fuels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFuels(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching fuels:", error);
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
          navigate("/all-fuel");
        })
        .catch((err) => {
          console.error(err);
          setErrors(err.response?.data); // Adjust error handling here
        });
    }
  };

  const fuelsDrop = ["Petrol", "Diesel", "Electric"].map((fuelType) => {
    return (
      <option key={fuelType} value={fuelType}>
        {fuelType}
      </option>
    );
  });

  return (
    <>
      <h2 class="mb-3 ml-3 text-lg">
        <b>Edit Fuel </b>
      </h2>
      <Form
        class="d-flex flex-column align-items-center space-y-4 max-w-2xl mx-auto pb-12 pt-4 border border-secondary"
        onSubmit={submitForm}
        method="POST"
      >
        <div>
          <div class="w-72 item-center border border-gray-300">
            <select
              name="fuel_type"
              onChange={handleForm}
              class="form-select"
              value={form.fuel_type}
            >
              <option value="">-- Please choose a fuel type --</option>
              {fuelsDrop}
            </select>
          </div>
          <span class="text-danger">{errors?.fuel_type?.message}</span>
        </div>

        <Input
          class="form-control"
          type="text"
          onChange={handleForm}
          value={form.price}
          name="price"
          placeholder="price"
        />
        <span class="text-danger">{errors?.price?.message}</span>
        <Input
          class="form-control"
          type="text"
          onChange={handleForm}
          value={form.rating}
          name="rating"
          placeholder="rating"
        />
        <span class="text-danger">{errors?.rating?.message}</span>
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </>
  );
};

export default Edit;
