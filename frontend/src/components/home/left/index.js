import UserInfo from "./UserInfo";
import "./style.css";
import "./UserInfo.css";
import aboutIcon from "../../../styles/icons/icons8-about-100.png";
import locationIcon from "../../../styles/icons/icons8-location-94.png";
import productsIcon from "../../../styles/icons/icons8-products-64.png";
import reviewIcon from "../../../styles/icons/icons8-reviews-64.png";
import websiteIcon from "../../../styles/icons/icons8-website-48.png";
import youtubeIcon from "../../../styles/icons/icons8-youtube-94.png";
import linkedinIcon from "../../../styles/icons/icons8-linkedin-48.png";
import twitterIcon from "../../../styles/icons/icons8-twitter-48.png";
import facebookIcon from "../../../styles/icons/icons8-facebook-48.png";
import instagramIcon from "../../../styles/icons/icons8-instagram-48.png";
import arrowDownIcon from "../../../styles/icons/icons8-arrow-down-50.png";

export default function LeftHome({ user }) {
  // Define the display name based on account type
  let displayName;
  if (user?.details?.accountType === "company") {
    displayName = user?.details?.companyName || "Company: Not Set";
  } else if (user?.details?.accountType === "personal") {
    displayName =
      user?.details?.firstName && user?.details?.lastName
        ? `${user.details.firstName} ${user.details.lastName}`
        : "Personal: Not Set";
  }

  return (
    <div className="left_home">
      <div className="left_link">
        <div className="picture_and_name">
          <div className="picture">
            <img
              className="user_image"
              src={user?.picture}
              alt="User's avatar"
            />
          </div>
          <div className="user_name">{displayName}</div>
          <div className="account_type">
            ({user?.details?.accountType || "Not Set"})
          </div>
        </div>
        <div className="follow_and_message_button">
          <button className="buttons">Follow User</button>
          <button className="buttons">Message User</button>
        </div>
      </div>

      <hr className="divider" />
      <div>
        <UserInfo icon={aboutIcon} text={"Information"} />
        <UserInfo
          icon={locationIcon}
          text={user?.location || "Location not set"}
        />
        <UserInfo icon={productsIcon} text={"Products and services"} />
        <UserInfo icon={reviewIcon} text={"Reviews"} />
        {/* Repeat for other pieces of information */}
      </div>
      <hr className="divider" />
      <div className="links">
        <img src={websiteIcon} alt="" />
        <img src={youtubeIcon} alt="" />
        <img src={linkedinIcon} alt="" />
        <img src={twitterIcon} alt="" />
        <img src={facebookIcon} alt="" />
        <img src={instagramIcon} alt="" />
      </div>
    </div>
  );
}
