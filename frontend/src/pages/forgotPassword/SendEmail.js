import axios from "axios";
import { Link } from "react-router-dom";

export default function SendEmail({
  userInfos,
  email,
  error,
  setError,
  setVisible,
  setUserInfos,
  loading,
  setLoading,
}) {
  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      setError("");
      setVisible(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form_dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            Receive the code to reset your password
          </div>
          <label htmlFor="email" className="hover2">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send Code to: </span>
              <span>{userInfos.email}</span>
            </div>
          </label>
        </div>
        {error && (
          <div className="error_text" style={{ paddingLeft: "20px" }}>
            {error}
          </div>
        )}
        <div className="box_space"></div>

        <div className="reset_right">
          <div className="reset_form_btns">
            <Link to="/login" className="gray_btn">
              Not You?
            </Link>
            <button
              onClick={() => {
                sendEmail();
              }}
              className="blue_btn"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
