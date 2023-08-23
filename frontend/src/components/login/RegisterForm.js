import { Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import TypeOfAccountSelect from "./TypeOfAccountSelect";
import ErrorWithTopArrow from "./ErrorWithTopArrow";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useFormikContext } from "formik";

export default function RegisterForm({ setVisible }) {
  // To navigate between pages
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Yup set Schema
  const RegisterValidation = Yup.lazy((values) =>
    Yup.object({
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
      accountType: Yup.string().required(
        "Please select your account type, Company or Personal"
      ),
      ...(values.accountType === "company"
        ? {
            companyName: Yup.string().required("Company Name is required"),
          }
        : {
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
          }),
    })
  );

  // Define state variables for success and error messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async (values) => {
    setLoading(true);

    // Introduce a delay using setTimeout
    setTimeout(async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/register`,
          values
        );
        setLoading(false);
        setError("");
        setSuccess(data.message);
        const { message, ...rest } = data;
        setTimeout(() => {
          dispatch({ type: "LOGIN", payload: rest });
          Cookies.set("user", JSON.stringify(rest), { expires: 7 }); // Expires in 7 days

          navigate("/");
        }, 1500);
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.message || "Email already registered");
        console.log(error.response);
      }
    }, 1500);
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Create Account</span>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            accountType: "", // accountType should reflect the value in TypeOfAccountSelect
            companyName: "",
            firstName: "",
            lastName: "",
          }}
          validationSchema={RegisterValidation}
          onSubmit={(values) => registerSubmit(values)}
        >
          {({ touched, values }) => (
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
                <TypeOfAccountSelect />
                {touched.accountType && (
                  <ErrorMessage
                    name="accountType"
                    render={(msg) => <ErrorWithTopArrow message={msg} />}
                  />
                )}
              </div>
              {values.accountType === "company" && (
                <RegisterInput
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                />
              )}
              {values.accountType === "personal" && (
                <>
                  <RegisterInput
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <RegisterInput
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </>
              )}
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
              <div className="loader_wrapper">
                {" "}
                {/* <-- Wrapper div */}
                <DotLoader color="#1876f2" loading={loading} size={30} />
              </div>
              {error && <div className="error_text"> {error}</div>}
              {success && <div className="success_text"> {success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
