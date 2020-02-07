import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import { axiosWithAuth } from "./utils/axiosWithAuth";

 const FormWrapper = styled.div`
  width:100%;
  `;

const StyledForm = styled(Form)`
  padding: 2rem;
  width: 30%;
  margin: 0 auto;
  background: #fff;
  height: 70vh;
 `;

const HeaderTwo = styled.h2`
  float: left;
  height: 100%vh;
  
  @media:(max-wdith:500px){
  font-size:1.3rem;
  text-align:center;
   } 
`;

const Input = styled(Field)`
  margin: 1.5rem auto;
  padding: .7rem;
  border: none;
  width: 10rem;
  border-bottom: 2px solid #00a35e;
  border-radius: 0px;
  background: #fff;
`;

const Button = styled.button`
  margin: 1.2rem auto;
  border-radius: 2px solid;
  padding: 10px;
  width: 12rem;
  background: green;
  color: whitesmoke;
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover{
      background:whitesmoke;
      color:#00a35e;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: whitesmoke;
  &:hover{
      color:#00a35e;
  }
`;

 
    


const UserForm = ( { values, errors, touched, isSubmitting, status}) => {
  const [username, setUserName] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setUserName(username => [...username, status]);
  }, [status]);

  return (
    <FormWrapper>
      <HeaderTwo>WEIGHT-LIFTING-JOURNAL</HeaderTwo>
      <StyledForm className="parent">
        <div>
          <label className="for-label" htmlFor="username">
            <h1>Register</h1>
          </label>
          {touched.username && errors.username && <p>{errors.username}</p>}
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
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
        <Button disabled={isSubmitting} type="submit">Register</Button>
        <Button >
          <StyledLink to="/login">Go Back Home</StyledLink>
        </Button>
      </StyledForm>
  </FormWrapper>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username:username || "",
      password:password ||  ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("User name is required"),
    password: Yup.string()
      .min(7, "Password must be 7 Characters")
      .required("Pasword is required")
  }),
  
  
  handleSubmit(values,props,{ resetForm, setErrors, setSubmitting, setStatus, }) {
     setTimeout(() => {
      if (values.username === values.username) {
        setErrors({ username: "That user is already taken" });
      } else {
       props.history.push("/login");
      }
      setSubmitting(false);
    }, 2000);
    console.log(values);

    axiosWithAuth()
      .post("/api/auth/register", values)
      .then(res => {
        console.log("Success", res);
        setStatus(res.data);
        resetForm();
        console.log(res.data);
      })
      .catch(err => {
        console.log("The post requested: ", err.response);
      });
  }
})(UserForm);
export default FormikUserForm;