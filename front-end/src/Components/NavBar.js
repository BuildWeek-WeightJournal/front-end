import React from "react";
import { Route } from "react";
import { Link } from 'react-router-dom';
import DrawerToggleButton from "../Components/SideDrawer/DrawerToggleButton";
import "./NavBar.css";

const NavBar = props => (
  <header className="navbar">
    <nav className="navbar-navigation">
      <div>  
        {/* <DrawerToggleButton /> */}
      </div>
      <div className="navbar-logo">
        <a href="/">WEIGHT LIFTING JOURNAL</a>
      </div>
      <div className="spacer" />
      <div className="navbar-navigation-items">
        <ul>
          <li>
            <a href="/">My Exercises</a>
          </li>
          <li>
            <Link to='/protected/add_workout'>
              <p>Add Exercise</p>
            {/* <a href="/">Add Exercise</a> */}
            </Link>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
export default NavBar;
