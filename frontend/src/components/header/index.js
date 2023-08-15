import "./style.css";
import { Link } from "react-router-dom";
import Showmystocklogo from "../../svg/showmystocklogo";
import Search from "../../svg/search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTruck,
  faUsers,
  faBalanceScale,
  faCog,
  faComments,
  faBell,
  faHeart,
  faShoppingCart,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((user) => ({ ...user }));
  console.log(user);
  const color = "#65676b";
  const color2 = "#163172";
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Showmystocklogo />
          </div>
        </Link>
        <div className="search search1">
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Showmystock"
            className="hide_input"
          ></input>
        </div>
      </div>
      <div className="header_middle">
        <Link to="/home" className="middle_icon hover1 active">
          <FontAwesomeIcon color={color2} icon={faHome} />
        </Link>
        <Link to="/suppliers" className="middle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faTruck} />
        </Link>
        <Link to="/clients" className="middle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faUsers} />
          <div className="clients_notification">10+</div>
        </Link>
        <Link to="/marketplace" className="middle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faBalanceScale} />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/user" className="profile_link hover1">
          <img src={user?.picture} alt="" />
          <span>Username</span>
        </Link>
        <Link to="/settings" className="circle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faCog} />
        </Link>
        <Link to="/comments" className="circle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faComments} />
          <div className="right_notification">1</div>
        </Link>
        <Link to="/notifications" className="circle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faBell} />
          <div className="right_notification">2</div>
        </Link>
        <Link to="/liked" className="circle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faHeart} />
          <div className="right_notification">3</div>
        </Link>
        <Link to="/sales" className="circle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faShoppingCart} />
        </Link>
        <Link to="/logout" className="circle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faSignOut} />
        </Link>
      </div>
    </header>
  );
}
