import React, { useState } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { withFormik, Formik, Form, Field } from "formik";


import * as Yup from "yup";

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
      }, 1000);
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

const FormikUserForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      userName: username || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("User name is required"),
    password: Yup.string()
      .min(7, "Password must be 7 Characters")
      .required("Pasword is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    setTimeout(() => {
      if (values.username === values.username) {
        setErrors({ userName: "That user is already taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);

    axiosWithAuth()
      .post("/api/auth/register", values)
      // axios
      //   .post(
      //     "https://weightliftingjournal-buildweek.herokuapp.com/api/auth/register",
      //     values
      //   )
      .then(res => {
        // console.log("Success", res);
        setStatus(res.data.id);
        resetForm();
        console.log(res.data.id);
      })
      .catch(err => {
        // console.log("The post requested: ", err.response);
      });

    console.log(values);
  }
})(SignUp);
export default FormikUserForm;

// export default SignUp;
