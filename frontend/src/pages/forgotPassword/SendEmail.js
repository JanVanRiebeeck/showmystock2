import { Link } from "react-router-dom";

export default function SendEmail({ userInfos }) {
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

        <div className="reset_right">
          <div className="reset_form_btns">
            <Link to="/login" className="gray_btn">
              Not You?
            </Link>
            <button type="submit" className="blue_btn">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
