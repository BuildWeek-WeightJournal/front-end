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
        console.log(res);
        localStorage.setItem("token", res.data);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("username", res.data.username);
        props.history.push("/protected/my_workouts");
      })

      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="login-wrapper">
        <div className="content-wrapper">
          <h1>Welcome to Lift Tracker</h1>

          <p>Weight-Lifting Journal</p>

          <Formik
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form onSubmit={login}>
                <br />
                <Field
                  className="input"
                  placeholder="Username"
                  id="username"
                  type="username"
                  name="username"
                  value={username.username}
                  onChange={userHandleChange}
                />
                <br />
                <ErrorMessage name="email" component="div" />

                <br />
                <Field
                  className="input"
                  placeholder="Password"
                  id="password"
                  type="password"
                  name="password"
                  value={password.password}
                  onChange={passwordHandleChange}
                />
                <br />
                <br />
                <ErrorMessage name="password" component="div" />
                <button
                  className="signin-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Log in
                </button>
                <p>Don't have an account?</p>
                <Link to="/signup">
                  <button>Sign Up Here</button>
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
