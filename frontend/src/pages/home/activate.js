// src/pages/home activate.js

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import MiddleHome from "../../components/home/middle";
import RightHome from "../../components/home/right";

import "./style.css";
import ActivateForm from "../../components/activateForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Activate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState("asdf");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Get the user token from the parameters in the URL
  const { token } = useParams();
  useEffect(() => {
    activateAccount();
  }, []);
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div>
      {" "}
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeeded"
          text={success}
          loading={loading}
        />
      )}{" "}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed"
          text={error}
          loading={loading}
        />
      )}
      <div>
        <Header />

        <div>
          <LeftHome user={user} />
          <MiddleHome />
          <RightHome user={user} />
        </div>
      </div>
    </div>
  );
}
