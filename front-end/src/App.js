import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import "./App.css";

import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <Router>
      <h1>Weightlifting Journal</h1>

      <Switch>
        <Route path='/login' component={Login}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
