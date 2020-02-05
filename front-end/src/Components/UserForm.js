import React, { useState } from "react";

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
const UserForm = ({ values, errors, touched, isSubmitting, props }) => {

// Added for routing after signup  
// const [username] = useState({
//   username: ''
// })

// const [password] = useState({
//   username: ''
// })


//   const signUpButton = () => {
//     if (username.username !== "" && password.password !== "") {
//       setTimeout(() => {
//         props.history.push("/login");
//       }, 400);
//     }
//   };
  return (
    <div>
      <Form>
        <label htmlFor="userName">
          User:
          <div>
            {touched.userName && errors.userName && <p>{errors.userName}</p>}
            <Field
              id="userName"
              type="userName"
              name="userName"
              placeholder="userName:"
            />
          </div>
        </label>
        <label htmlFor="password">
          Password:
          <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Password:"
            />
          </div>
        </label>
        <button disabled={isSubmitting} >Register</button>
      </Form>
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
    userName: Yup.string()
    .required("User name is required"),
    password: Yup.string()
      .min(7, "Password must be 7 Characters")
      .required("Pasword is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.userName === "Gringo") {
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
