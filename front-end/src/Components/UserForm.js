import React from "react";
import {withFormik,  Form,  Field} from "formik";
import  * as Yup from 'yup';
const UserForm = ({values,errors,touched,isSubmitting})=> {
return(
<div>
  <Form>
    <label htmlFor="userName">
      User:
      <div>
        {touched.userName && errors.userName && <p>{errors.userName}</p>}
        <Field id="userName" type="userName" name="userName" placeholder="userName:" />
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
    <button disabled={isSubmitting}>Register</button>
  </Form>
</div>
  );
}
const FormikUserForm = withFormik({
mapPropsToValues({userName, password}){
  return{
    userName:userName || "",
    password:password || ""
  }
},
validationSchema: Yup.object().shape({
userName: Yup.string().userName().required('User name is required'),
password: Yup.string().min(7, 'Password must be 7 Characters').required('Pasword is required')
}),
handleSubmit(values, {resetForm, setErrors, setSubmitting}){
setTimeout(() =>{
  if(values.userName === 'Gringo'){
  setErrors({userName: 'That user is already taken'})
}else{
  resetForm()
}
setSubmitting(false)
}, 2000)
  console.log(values)
}
})(UserForm)
export default FormikUserForm;