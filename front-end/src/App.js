import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Private from "./Components/PrivateRoute";


import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
