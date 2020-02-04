import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Private from "./Components/PrivateRoute";
import NavBar from "./Components/NavBar";

import SideDrawer from "./Components/SideDrawer/SideDrawer";
import BackDrop from "./Components/BackDrop/BackDrop";
import WorkoutForm from "./Components/workoutform";

import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import UserForm from "./Components/UserForm";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          <UserForm />
          <SideDrawer />
          <BackDrop />
          <SignUp />

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
