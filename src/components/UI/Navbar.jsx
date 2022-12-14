import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/">Main</Link>
          </li>
          <li className="navbar__item">
            <Link to="/login">Login</Link>
          </li>
          <li className="navbar__item">
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
