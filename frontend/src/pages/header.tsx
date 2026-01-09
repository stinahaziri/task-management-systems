import React from 'react';
import './styles/getDemoStyle.css';
import Index from"./Index"
import {Link}from "react-router-dom";

import logo from"./image/Capture-removebg-preview.png";

function Header() {
  return (
    <header>
      <div>
        <a href="index.html">
          <img className="logo" src={logo} alt="" />
        </a>
      </div>
      
      <input type="checkbox" id="check"/>
      <label className="checkInput">
        <i className="fa-solid fa-bars"></i>
      </label>
      
      <ul>
        <Link to={"/"}>
        <li><a href="index.html">Home</a></li>
        </Link>

        <Link to={"/about"}>
        <li><a href="about.html">About</a></li>
        </Link>
        <Link to={"/pricing"}>
        <li><a href="pricing.html">Pricing</a></li>
        </Link>
         <Link to={"/contact"}>
        <li><a href="contact.html">Contact</a></li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;