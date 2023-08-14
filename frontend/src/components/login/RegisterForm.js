import { Form, Formik, Field } from "formik";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";

export default function RegisterForm() {
  // Yup set Schema
  const RegisterValidation = Yup.object({
    email: Yup.string()
      .required(
        "You will need this when you log in and if you ever need to reset your password"
      )
      .email("Must be a valid email")
      .max(100),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)"
      )
      .min(6, "Password must be at least 6 characters long")
      .max(50, "Password cannot exceed 50 characters"),
    accountType: Yup.string().required("Account type is required"),
  });

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Create Account</span>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            accountType: "",
          }}
          // Use Yup to validate the data
          validationSchema={RegisterValidation}
          // Use Formik to do the submission of values
          onSubmit={(values) => {
            // Do something with the form values, like sending them to your API
            console.log(values);
          }}
        >
          {(formik) => (
            <Form className="regsiter_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  name="email"
                  placeholder="Email Address"
                />
                <RegisterInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">Type of account?</div>
                <div className="reg_grid">
                  <label htmlFor="company">
                    Company{" "}
                    <Field
                      type="radio"
                      name="accountType"
                      id="company"
                      value="company"
                    />
                  </label>
                  <label htmlFor="personal">
                    Personal{" "}
                    <Field
                      type="radio"
                      name="accountType"
                      id="personal"
                      value="personal"
                    />
                  </label>
                </div>
              </div>
              <div className="reg_infos">
                By clicking Submit, you agree to our {""}
                <span>Terms and Conditions. </span>
                You may receive notifications from us and can opt out at any
                time.
              </div>
              <div className="reg_btn_wrapper">
                <button type="submit" className="blue_btn open_signup">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
