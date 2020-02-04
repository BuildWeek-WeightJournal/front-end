import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Private from "./Components/PrivateRoute";

import NavBar from "./Components/NavBar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import BackDrop from "./components/BackDrop/BackDrop";
import WorkoutForm from "./Components/workoutform";

import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <NavBar />
          <SideDrawer />
          <BackDrop />
          <Route path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route component={Login} />
          <Route path="/workout" component={WorkoutForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
