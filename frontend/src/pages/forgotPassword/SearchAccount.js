import { Formik, Form } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchAccount({ email, setEmail, error }) {
  return (
    <div className="reset_form">
      <div className="reset_form_header"> Your Email</div>
      <div className="reset_form_text"></div>
      <Formik enableReinitialize initialValues={{ email }}>
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Please enter your email address"}
            />
            {error && <div className="error_text">{error}</div>}
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
