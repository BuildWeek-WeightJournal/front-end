import React from "react";
import { Route } from "react";
import { Link } from "react-router-dom";
import DrawerToggleButton from "../Components/SideDrawer/DrawerToggleButton";
import "./NavBar.css";

const NavBar = props => (
  <header className="navbar">
    <nav className="navbar-navigation">
      <div>  
        <DrawerToggleButton click={props.drawerClickHandler}/>
      </div>
      <div className="navbar-logo">
        <h3>WEIGHT-LIFTING JOURNAL</h3>
      </div>
      <div className="spacer" />
      <div className="navbar-navigation-items">
        <ul>
          <li>
            <a href="/">Work Outs</a>
          </li>
          <li>
            <a href="/">New Work Out</a>

            <Link to="/protected/add_workout">
              <p>Add Exercise</p>
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
