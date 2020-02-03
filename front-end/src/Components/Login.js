import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";

import { axiosWithAuth } from "./utils/axiosWithAuth";

const Login = props => {
  const [username, setUsername] = useState({
    username: ""
  });

  const [password, setPassword] = useState({
    password: ""
  });

  const userHandleChange = event => {
    // @ts-ignore
    setUsername({
      username: event.target.value
    });
  };

  const passwordHandleChange = event => {
    // @ts-ignore
    setPassword({
      password: event.target.value
    });
  };

  const mergedObjects = { ...username, ...password };

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/auth/login", mergedObjects)

      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data);
        props.history.push("/protected");
      })

      .catch(err => console.log(err));
  };

  return (
    <div>
      <div>
        <h1>Welcome to Weightlifting Journal</h1>

        <h3>Please Login or Sign Up.</h3>

        <Formik
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form onSubmit={login}>
              <label htmlFor="username">Username: </label>
              <br />
              <Field
                className="input"
                id="username"
                type="username"
                name="username"
                value={username.username}
                onChange={userHandleChange}
              />
              <br />
              <ErrorMessage name="email" component="div" />
              <label htmlFor="password">Password: </label>
              <br />
              <Field
                className="input"
                id="password"
                type="password"
                name="password"
                value={password.password}
                onChange={passwordHandleChange}
              />
              <br />
              <br />
              <ErrorMessage name="password" component="div" />
              <button className="signin-btn" type="submit" disabled={isSubmitting}>
                Sign In
              </button>
              <p>or</p>
              <Link to="/signup">
                <button>Sign Up Here</button>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
