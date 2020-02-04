import React, { useState } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { Formik, Form, Field } from "formik";

const SignUp = props => {
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

  const credentials = {
    username: username.username,
    password: password.password
  };

  const signUp = e => {
    e.preventDefault();
    setUsername(prev => ({
      ...prev
    }));
    axiosWithAuth()
      .post("/api/auth/register", credentials)
      .then(res => {
        console.log(res)
        console.log(res.data)
        setError(error);
      })
      .catch(err => {
        setError(error);
      });
  };

  const signUpButton = () => {
    if (username.username !== "" && password.password !== "") {
      setTimeout(() => {
        props.history.push("/login");
      }, 400);
    }
  };

  const [error, setError] = useState("");

  return (
    <div>
      <h1>Sign Up</h1>

      <Formik
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form onSubmit={signUp}>
            <label htmlFor="username">Username: </label>
            <br />
            <Field
              id="username"
              type="username"
              name="username"
              value={username.username}
              onChange={userHandleChange}
            />
            <br />

            <label htmlFor="password">Password: </label>
            <br />
            <Field
              id="password"
              type="password"
              name="password"
              value={password.password}
              onChange={passwordHandleChange}
            />
            <br />
            <br />

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={signUpButton}
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
