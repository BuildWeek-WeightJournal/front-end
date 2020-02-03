import React from "react";
import {Route} from "react"
import "./NavBar.css";

const NavBar = props =>
(
 <header className="navbar">
  <nav className="navbar-navigation">
    <div></div>
    <div className="navbar-logo">
      <a href="/">WEIGHT LIFTING JOURNAL</a>
    </div>
    <div className="navbar-navigation-items">
      <ul>
        <li>
          <a href="/">Logout</a>
        </li>
        <li>
          <a href="/">My Exercises</a>
        </li>
        <li>
          <a href="/">Add Exercise</a>
        </li>
      </ul>
    </div>
  </nav>
</header>
   
    
    
);
export default NavBar;