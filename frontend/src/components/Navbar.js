import React from "react";
import "../styles/Navbar.css";
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div>
      <div class="header-box">
        <div class="name-box">
          <Link to="/" alt="">
            Authentication & Authorization
          </Link>
        </div>
        <div class="navLink-box">
          <ul>
            <li>
              
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/Login">Login</a>
            </li>
            <li>
              <a href="/Signup">SignUp</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
