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

  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const allmenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
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
        <Link to="/liked" className="circle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faHeart} />
          <div className="right_notification">3</div>
        </Link>
        <Link to="/sales" className="circle_icon hover1">
          <FontAwesomeIcon color={color2} icon={faShoppingCart} />
        </Link>
        <div className="circle_icon hover1">
          <img src={user?.picture} alt="" />
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
