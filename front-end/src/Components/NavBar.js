import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import DrawerToggleButton from "../Components/SideDrawer/DrawerToggleButton";
import "./NavBar.css";

const NavBar = props => {
  return (
    <header className="navbar">
      <nav className="navbar-navigation">
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="navbar-logo">
          <h3>WEIGHT-LIFTING JOURNAL</h3>
        </div>
        <div className="spacer" />
        <div className="navbar-navigation-items">
          <div>
            <Link to="/protected/my_workouts">Work Outs</Link>
          </div>
          <div>
            <Link to="/protected/add_workout">New Workout</Link>
          </div>
          <div>
            <Link to={`./`} onClick={() => localStorage.removeItem("token")}>
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
