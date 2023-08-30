import { Formik, Form } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function SearchAccount({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfos,
  setVisible,
}) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(50, "Email can't be more than 50 characters"),
  });

  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      setUserInfos(data);
      // Change the view to the second screen element
      setVisible(1);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred while trying to send the request.");
      }
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header"> Your Email</div>
      <div className="reset_form_text"></div>
      <Formik
        enableReinitialize
        initialValues={{ email }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSearch();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Please enter your email address"}
            />
            {error && <div className="error_text">{error}</div>}

            <div className="box_space"></div>
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
