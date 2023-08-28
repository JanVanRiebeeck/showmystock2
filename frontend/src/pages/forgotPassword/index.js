import "./style.css";
import Showmystocklogo from "../../svg/showmystocklogo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";

export default function ForgotPassword() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(1);
  const { email, setEmail } = useState("");
  const { error, setError } = useState("");

  return (
    <div>
      <div className="forgot_header">
        <Showmystocklogo />
        <span>showmystock</span>
        <Link to="/login" className="right_forgot">
          <button className="blue_btn">Login</button>
        </Link>
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount email={email} setEmail={setEmail} error={setError} />
        )}
        {visible === 1 && <SendEmail />}
      </div>
    </div>
  );
}
