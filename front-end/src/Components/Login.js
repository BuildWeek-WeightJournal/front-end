import React, { useState } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { Link } from "react-router-dom";

const Login = props => {
  const [username, setUsername] = useState({
    username: ""
  });

  const [password, setPassword] = useState({
    password: ""
  });

  const userHandleChange = e => {
    setUsername({
      username: e.target.value
    });
  };

  const passwordHandleChange = e => {
    setPassword({
      password: e.target.value
    });
  };

  const mergedSignin = { ...username, ...password };

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/auth/login", mergedSignin)

      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div>
        <h1>Login Page</h1>

        <form onSubmit={login}>
          <label htmlFor="username">Username: </label>
          <br />
          <input
            id="username"
            type="username"
            name="username"
            value={username.username}
            onChange={userHandleChange}
          />
          <br />

          <label htmlFor="password">Password: </label>
          <br />
          <input
            id="password"
            type="password"
            name="password"
            value={password.password}
            onChange={passwordHandleChange}
          />
          <br />
          <br />

          <button type="submit">Sign In</button>
          <p>or</p>
          <Link to="/signup">
            <button>Sign Up Here</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
