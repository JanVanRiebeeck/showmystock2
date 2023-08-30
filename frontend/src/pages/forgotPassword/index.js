import "./style.css";
import Showmystocklogo from "../../svg/showmystocklogo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/login/Footer";
import ChangePassword from "./ChangePassword";

export default function ForgotPassword() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [userInfos, setUserInfos] = useState("");

  console.log(userInfos);

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
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            email={email}
            userInfos={userInfos}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            code={code}
            setCode={setCode}
            userInfos={userInfos}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            setUserInfos={setUserInfos}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            conf_password={conf_password}
            userInfos={userInfos}
            setConf_password={setConf_password}
            setPassword={setPassword}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            setUserInfos={setUserInfos}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
