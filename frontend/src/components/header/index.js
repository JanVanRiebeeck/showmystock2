import "./style.css";
import { Link } from "react-router-dom";
import Showmystocklogo from "../../svg/showmystocklogo";
import Search from "../../svg/search";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";

import { useState, useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTruck,
  faUsers,
  faBalanceScale,
  faBars,
  faComments,
  faBell,
  faHeart,
  faShoppingCart,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

export default function Header() {
  const { user } = useSelector((user) => ({ ...user }));

  const color = "#65676b";
  const color2 = "#163172";

  // UseState hooks (Initialize a state variable with a value "false" and a function)
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // useRef hook ( create ref to DOM element "div" ref wil be updated once element is renedered)
  const allmenu = useRef(null);
  const usermenu = useRef(null);

  // Custom Hooks
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Showmystocklogo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Showmystock"
            className="hide_input"
          ></input>
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">
        <div className="middle_top">
          <Link to="/home" className="middle_icon hover1 active">
            <FontAwesomeIcon color={color2} icon={faHome} />
          </Link>
          <Link to="/suppliers" className="middle_icon hover1">
            <FontAwesomeIcon color={color2} icon={faTruck} />
          </Link>
        </div>
        <div className="middle_bottom">
          <Link to="/clients" className="middle_icon hover1">
            <FontAwesomeIcon color={color2} icon={faUsers} />
            <div className="clients_notification">10+</div>
          </Link>
          <Link to="/marketplace" className="middle_icon hover1">
            <FontAwesomeIcon color={color2} icon={faBalanceScale} />
          </Link>
        </div>
      </div>
      <div className="header_right">
        <div className="right_top">
          <div
            className="circle_icon hover1"
            ref={allmenu}
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <FontAwesomeIcon color={color2} icon={faBars} />
            {showAllMenu && <AllMenu color={color} />}
          </div>
          <Link to="/comments" className="circle_icon hover1">
            <FontAwesomeIcon color={color2} icon={faComments} />
            <div className="right_notification">1</div>
          </Link>
          <Link to="/notifications" className="circle_icon hover1">
            <FontAwesomeIcon color={color2} icon={faBell} />
            <div className="right_notification">2</div>
          </Link>
        </div>
        <div className="right_bottom">
          <Link to="/liked" className="circle_icon hover1">
            <FontAwesomeIcon color={color2} icon={faHeart} />
            <div className="right_notification">3</div>
          </Link>
          <Link to="/sales" className="circle_icon hover1">
            <FontAwesomeIcon color={color2} icon={faShoppingCart} />
          </Link>

          <div
            className="circle_icon hover1"
            ref={usermenu}
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <img src={user?.picture} alt="" />
            {showUserMenu && <UserMenu color={color} />}
          </div>
        </div>
      </div>
    </header>
  );
}
