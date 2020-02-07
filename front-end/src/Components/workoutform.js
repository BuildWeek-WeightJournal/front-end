import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { InputForm, InputField, Button } from "./styles";
import styled from "styled-components";
import NavBar from "./NavBar";
import SideDrawer from "./SideDrawer/SideDrawer";
import BackDrop from "./BackDrop/BackDrop";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import Anime from "react-anime";

const headerStyle = {
  margin: "0 0 0 0"
};

const WorkoutForm = ({ values, errors, touched, status }) => {
  const [workout, setWorkout] = useState([{}]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setWorkout(workout => [...workout, status]);
  }, [status]);
  return (
    <div className="workout-form">
      <NavBar/>
      <Anime rotate={720}>
      <h1 style={headerStyle}>Add Workouts</h1>
      </Anime>
      <InputForm>
        <label htmlFor="name">
          Please enter your a name for your workout:
          <Field id="name" type="text" name="name" placeholder="name" />
          {touched.name && errors.name && (
            <p className="errors"> {errors.name} </p>
          )}
        </label>
        <InputField className="body_region" as="select" name="body_region">
          <option>Choose a muscle group</option>
          <option value="Chest">Chest</option>
          <option value="Biceps">Biceps</option>
          <option value="Triceps">Triceps</option>
          <option value="Trapezius">Trapezius</option>
          <option value="Deltoids">Deltoids</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Abdominals">Abdominals</option>
          <option value="Gluteals">Gluteals</option>
          <option value="Thighs">Thighs</option>
          <option value="Calves">Calves</option>
        </InputField>
        <label htmlFor="weight">
          <Field id="weight" type="number" name="weight" placeholder="weight" />
          {touched.weight && errors.weight && (
            <p className="errors"> {errors.weight} </p>
          )}
        </label>
        <label htmlFor="reps">
          <InputField id="reps" type="number" name="reps" placeholder="reps" />
          {touched.reps && errors.reps && (
            <p className="errors"> {errors.reps} </p>
          )}
        </label>
        <Button className="submitButton" type="submit">Add Workout</Button>
      </InputForm>
    </div>
  );
};
const FormikWorkoutForm = withFormik({
  mapPropsToValues({ name, body_region, weight, reps }) {
    return {
      name: name || "",
      body_region: body_region || "",
      weight: weight || "",
      reps: reps || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    weight: Yup.number().required("Weight is required!").positive().integer(),
    reps: Yup.number().required("Number of reps is required!").positive().integer()
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    const id = localStorage.getItem("userId");
    axiosWithAuth()
      .post(`/api/workouts/${id}`, values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(WorkoutForm);
export default FormikWorkoutForm;
