import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
const UserForm = ({ values, errors, touched, isSubmitting }) => {
  return (
    <div>
      <Form>
        <label htmlFor="email">
          Email:
          <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field id="email" type="email" name="email" placeholder="Email:" />
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
        <button disabled={isSubmitting}>Sign In</button>
      </Form>
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(7, "Password must be 7 Characters")
      .required("Pasword is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "adeeboom311082@gmail.com") {
        setErrors({ email: "That email is already taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
    console.log(values);
  }
})(UserForm);
export default FormikUserForm;
