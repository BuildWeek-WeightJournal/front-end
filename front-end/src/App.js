import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Private from "./Components/PrivateRoute";

import UpdateWorkout from "./Components/UpdateWorkout";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import BackDrop from "./Components/BackDrop/BackDrop";
import WorkoutForm from "./Components/workoutform";
import NavBar from "./Components/NavBar";
import Workouts from "./Components/Workouts";

import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import UserForm from "./Components/UserForm";

function App() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(prevState => {
      return !prevState;
    });
  };

  const backDropClickhandler = () => {
    setSideDrawerOpen(false);
  };

  let sideDrawer;
  let backDrop;

  if (sideDrawerOpen) {
    sideDrawer = <SideDrawer />;
    backDrop = <BackDrop click={backDropClickhandler} />;
  }

  return (
    <div style={{ height: "100%" }} className="App">
      <NavBar drawerClickHandler={drawerToggleClickHandler} />
      {sideDrawer}
      {backDrop}
      <Router>
        <Switch>
          <Private exact path="/protected/my_workouts" component={Workouts} />
          <Private path="/protected/add_workout" component={WorkoutForm} />
          <Route
            path="/update_workout/:id"
            render={props => <UpdateWorkout {...props} />}
          />
          <Route path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
