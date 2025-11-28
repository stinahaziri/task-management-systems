import React from 'react';
import './styles/getDemoStyle.css';

function Header() {
  return (
    <header>
      <div>
        <a href="index.html">
          <img className="logo" src="image/Capture-removebg-preview.png" alt="" />
        </a>
      </div>
      
      <input type="checkbox" id="check"/>
      <label className="checkInput">
        <i className="fa-solid fa-bars"></i>
      </label>
      
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="news1.html">News</a></li>
        <li><a href="pricing.html">Pricing</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <img className="acc" src="image/HKstrategies-755-1-1024x683.jpg" alt="" />
    </header>
  );
}

export default Header;