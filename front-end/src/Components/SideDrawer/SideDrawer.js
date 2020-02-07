import React from "react"
import "./SideDrawer.css"
import {Link} from "react-dom"

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