import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Yup set Schema
  const LoginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  // Define state variables for success and error messages
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async (values) => {
    // Destructure email and password from values
    const { email, password } = values;
    // Introduce a delay using setTimeout
    setLoading(true);
    setTimeout(async () => {
      try {
        // Make the login request
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/login`,
          // how do I pass them here?
          { email, password }
        );
        setLoading(false);
        // Dispatch the user data to the Redux store
        dispatch({ type: "LOGIN", payload: data });
        console.log(data);
        // Set a cookie with a token or other session identifier
        Cookies.set("user", JSON.stringify(data), { expires: 7 }); // Expires in 7 days
        navigate("/");
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.message || "Error occurred");
      }
    }, 1500);
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <div className="logo_container">
          <img
            className="logo1"
            src="../../icons/Logo_with_layers.png"
            alt="Logo"
          />
          <img
            className="logo2"
            src="../../icons/showmystock.png"
            alt="Show My Stock"
          />
        </div>
        <div className="text_container">
          <span>
            Bridging Sources, Retailers, and Customers with Real-Time Inventory
            Visibility.
          </span>
        </div>
      </div>{" "}
      {/* This is the end of .login_1 */}
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            // Use Yup to validate the data
            validationSchema={LoginValidation}
            // Use Formik to do the submission of values
            onSubmit={loginSubmit} // Passing the entire values object
          >
            {() => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email Address"
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten Password?
          </Link>
          <DotLoader color="#1876f2" loading={loading} size={30} />
          {error && <div className="error_text">{error}</div>}
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
      </div>{" "}
      {/* This is the end of .login_2 */}
    </div>
  );
}
