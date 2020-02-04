import React from "react"
import "./SideDrawer.css"

const SideDrawer = props =>(
    <nav className="side-drawer">
      <ul>
        <li><a href="/">Logout</a></li>
        <li><a href="/">My Exercises</a></li>
        <li><a href="/">Add Exercise</a></li>
      </ul>
    </nav>
    
);
export default SideDrawer;