import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import DrawerToggleButton from "../Components/SideDrawer/DrawerToggleButton";
import "./NavBar.css";

const NavBar = props => (
  <header className="navbar">
    <nav className="navbar-navigation">
      <div>
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="navbar-logo">
        <h3>WEIGHT-LIFTING JOURNAL</h3>
      </div>
      <div className="spacer" />
      <Router>
        <div className="navbar-navigation-items">
          <div>
            <Link to={`/`}><a href="/">Work Outs</a></Link>
          </div>
          <div>
            <Link to={`/protected/add_workout`}>Add Exercise</Link>
            </div>
            <div>
            <Link to={`/`}>Logout</Link>
            </div>
        </div>
      </Router>
    </nav>
  </header>
);
export default NavBar;

