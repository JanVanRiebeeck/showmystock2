// src/pages/login/index.js

import "./style.css";

// import { useState } from "react"; try to only use Formik and not useState, dont need to manually sync changes between Formik and local state

import LoginForm from "../../components/login/LoginForm";
import Footer from "../../components/login/Footer";
import RegisterForm from "../../components/login/RegisterForm";

export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <RegisterForm />
        <Footer />
      </div>
    </div>
  );
}
