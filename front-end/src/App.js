import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Private from "./Components/PrivateRoute";

import WorkoutForm from "./Components/workoutform";
import UpdateWorkout from './Components/UpdateWorkout';

import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import UserForm from "./Components/UserForm";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Private exact path="/protected/workout" component={WorkoutForm} />
          <Route path ='/update_workout/:id' render = {props =>
          (<UpdateWorkout {...props} />)}/>
          <Route path="/login" component={Login} />
          <Route exact path="/signup" component={UserForm} />
          <Route component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
