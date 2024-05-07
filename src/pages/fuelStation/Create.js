// import dependencies
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// these import custom components for the form
import Input from "../../components/Input";
import Form from "../../components/Form";

// this is the create component for fuel station creation
const Create = () => {
  const navigate = useNavigate();

  // useState to manage form errors and form data
  const [errors, setErrors] = useState();
  const [form, setForm] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
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
    if (isRequired(["title", "description", "latitude", "longitude"])) {
      // this gets the token from local storage
      let token = localStorage.getItem("token");

      // this makes a post request to create a new fuel station
      axios
        .post(`http://localhost/api/fuelStations`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // this logs the response and navigate to the fuel stations page
          console.log(response);
          navigate("/fuelStation");
        })
        .catch((err) => {
          console.error(err);
          console.log(err.response.data)
          setErrors(err.response.data.err)
        });
    }
  };

  // the return renders the form for creating a fuel station
  return (
    <>
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
      <h2 className="pb-4 mb-2 text-xl">
        <b>Create Fuel Station</b>
      </h2>
      </div>
      {/* form component for fuel station creation */}
      <Form
        className="d-flex flex-column align-items-center space-y-4 max-w-2xl mx-auto pb-12 pt-4 border border-secondary"
        onSubmit={submitForm}
        method="POST"
      >
        {/* input components for fuel station details */}
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
        {/* the submit button for the form */}
        <button className="btn btn-primary" type="submit">Submit</button>
      </Form>
      </div>
    </>
  );
};

export default Create;
