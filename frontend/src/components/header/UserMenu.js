import { Link } from "react-router-dom";

import settingsIcon from "../../styles/icons/icons8-settings-64.png";
import favouriteIcon from "../../styles/icons/icons8-favorite-folder-48.png";
import supportIcon from "../../styles/icons/icons8-support-100.png";
import darkmodeIcon from "../../styles/icons/icons8-dark-mode-64.png";
import logoutIcon from "../../styles/icons/icons8-log-out-64.png";

export default function UserMenu({ color }) {
  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClickInside}>
      <div className="user_menu">
        <div className="all_menu_header">User Menu</div>
        <div className="user_menu_white_block">
          <div className="user_menu_group">
            <Link to="/profile" className="user_menu_item hover1">
              <img src={settingsIcon} alt="Truck Icon" />
              <div className="user_menu_col">
                <span className="span_heading">Profile & Settings</span>
                <span className="span_description">
                  Manage personal details, preferences and privacy settings
                </span>
              </div>
            </Link>
            <div className="user_menu_item hover1">
              <img src={favouriteIcon} alt="Truck Icon" />
              <div className="user_menu_col">
                <span className="span_heading">Wishlist & Favorites</span>
                <span className="span_description">
                  Save favorite suppliers, products, or posts to easily access
                  later
                </span>
              </div>
            </div>
            <div className="user_menu_item hover1">
              <img src={supportIcon} alt="Truck Icon" />
              <div className="user_menu_col">
                <span className="span_heading">Help & Support Center</span>
                <span className="span_description">
                  Access FAQs, guides, live chat support, or submit support
                  tickets
                </span>
              </div>
            </div>
            <div className="user_menu_item hover1">
              <img src={darkmodeIcon} alt="Truck Icon" />
              <div className="user_menu_col">
                <span className="span_heading">Display</span>
                <span className="span_description">Dark / Light mode</span>
              </div>
            </div>
            <div className="user_menu_item hover1">
              <img src={logoutIcon} alt="Truck Icon" />
              <div className="user_menu_col">
                <span className="span_heading">Log Out</span>
                <span className="span_description">Log out of Showmystock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
