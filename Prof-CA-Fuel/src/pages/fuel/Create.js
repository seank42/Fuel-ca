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

      // this makes a post request to create a new fuel station
      axios
        .post(`http://localhost/api/fuels`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // this logs the response and navigate to the fuel stations page
          console.log(response);
          navigate("/all-fuel");
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
      <h2 className="mb-3 ml-3 text-lg">
        <b>Create Fuel </b>
      </h2>
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
          value={form.fuel_type}
          name="fuel_type"
          placeholder="fuel_type"
        />
        <span className="text-danger">{errors?.fuel_type?.message}</span>
        <Input
          className="form-control"
          type="text"
          onChange={handleForm}
          value={form.price}
          name="price"
          placeholder="price"
        />
        <span className="text-danger">{errors?.price?.message}</span>
        <Input
          className="form-control"
          type="text"
          onChange={handleForm}
          value={form.rating}
          name="rating"
          placeholder="rating"
        />
        <span className="text-danger">{errors?.rating?.message}</span>
        {/* the submit button for the form */}
        <button className="btn btn-primary" type="submit">Submit</button>
      </Form>
    </>
  );
};

export default Create;
