import React from "react"
import "./SideDrawer.css"

const SideDrawer = props =>(
    <nav className="side-drawer">
      <ul>
        <li><a href="#">Work Outs</a></li>
        <li><a href="#">New Workout</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </nav>
    
);
export default SideDrawer;