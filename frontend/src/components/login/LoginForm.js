import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";

export default function LoginForm() {
  // Yup set Schema
  const LoginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

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
            onSubmit={(values) => {
              // Do something with the form values, like sending them to your API
              console.log(values);
            }}
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
          <div className="sign_splitter"></div>
          <button className="blue_btn open_signup">Create Account</button>
        </div>
      </div>{" "}
      {/* This is the end of .login_2 */}
    </div>
  );
}
