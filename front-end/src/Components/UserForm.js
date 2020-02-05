import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";

const HeaderTwo = styled.h2`
  float: left;
  height: 100%vh;
`;

const StyledForm = styled(Form)`
  padding: 2rem;
  width: 30%;
  margin: 0 auto;
  background: #fff;
  height: 70vh;
`;

const Input = styled(Field)`
  margin: 1.5rem auto;
  padding: 1rem;
  border: none;
  width: 10rem;
  border-bottom: 2px solid #00a35e;
  border-radius: 0px;
  background: #fff;
`;

const Button = styled.button`
  margin: 1.5rem auto;
  border-radius: 3px solid;
  padding: 15px;
  width: 12rem;
  background: green;
  color: whitesmoke;
  font-size: 1.5rem;
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: whitesmoke;
`;

const UserForm = ({ values, errors, touched, isSubmitting, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // console.log("status has changed", status);
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div>
      <HeaderTwo>WEIGHT-LIFTING-JOURNAL</HeaderTwo>
      <StyledForm className="parent">
        <div>
          <label className="for-label" htmlFor="userName">
            <h1>Register</h1>
          </label>
          {touched.userName && errors.userName && <p>{errors.userName}</p>}
          <Input
            id="userName"
            type="userName"
            name="userName"
            placeholder="User-Name"
          />
        </div>

        <label htmlFor="password">
          <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
        </label>
        <Button disabled={isSubmitting}>Register</Button>
        <Button >
          <StyledLink to="/login">Go Back Home</StyledLink>
        </Button>
      </StyledForm>
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ userName, password }) {
    return {
      userName: userName || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    userName: Yup.string().required("User name is required"),
    password: Yup.string()
      .min(7, "Password must be 7 Characters")
      .required("Pasword is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    axios
      .post("https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/", values)
      .then(res => {
        // console.log("Success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => {
        // console.log("The post requested: ", err.response);
      });
    setTimeout(() => {
      if (values.userName === values.users) {
        setErrors({ userName: "That user is already taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
    console.log(values);
  }
})(UserForm);
export default FormikUserForm;