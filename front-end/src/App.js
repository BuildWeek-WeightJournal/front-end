import React from 'react';
// import {Route, Switch} from "react-router-dom"
import NavBar from "./components/NavBar";
import SideDrawer from "./components/SideDrawer/SideDrawer"
import BackDrop from "./components/BackDrop/BackDrop";



function App() {
  return (
    <div style={{height: '100%'}}>
      <switch>
      <route exact path="/">
      <NavBar/>
      <SideDrawer/>
      <BackDrop/>
          
      </route>  
      </switch>
      
    </div>
  );
}

export default App;
