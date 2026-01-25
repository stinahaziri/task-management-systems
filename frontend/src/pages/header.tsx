import React from 'react';
import { NavLink } from "react-router-dom";
import './styles/getDemoStyle.css';
import logo from "./image/Capture-removebg-preview.png";

function Header() {
  return (
    <header className="header-container">
      <div className="logo-section">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </NavLink>
      </div>

      <input type="checkbox" id="check" className="menu-checkbox"/>
      <label htmlFor="check" className="checkInput">
        <i className="fa-solid fa-bars"></i>
      </label>

      <ul className="nav-list">
        <li>
          <NavLink to="/" className="nav-item" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-item">About</NavLink>
        </li>
        <li>
          <NavLink to="/pricing" className="nav-item">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
        </li>
        
         {/* <li>
          <NavLink to="/adminManagement" className="nav-item">User</NavLink>
        </li> */}
        <li>
           <NavLink to="/login" className="singUp">Sign Up</NavLink>
          {/* <a  className="singUp">Sign Up Free</a> */}
        </li>
      </ul>
    </header>
  );
}

export default Header;