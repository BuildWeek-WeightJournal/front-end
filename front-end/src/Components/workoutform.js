import React, { useState, useEffect } from "react";

// import anime from './anime-master/lib/anime.es.js';

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import NavBar from "./NavBar";

import SideDrawer from "./SideDrawer/SideDrawer";
import BackDrop from "./BackDrop/BackDrop";

//Select button with query selector then use animejs library to add animation

// var elements = document.querySelectorAll("button");
// anime({
//   targets: elements,
//   translateX: 270
// });

const WorkoutForm = ({ values, errors, touched, status, props }) => {
  const [workout, setWorkout] = useState([]);

  useEffect(() => {
    console.log("status has changed", status);
    status && setWorkout(workout => [...workout, status]);
  }, [status]);
  return (
    <div className="workout-form">
      <div>
        <NavBar />
        {/* <SideDrawer />
        <BackDrop /> */}
      </div>

      <Form className="workout-form">
        <label htmlFor="workoutName">
          Please enter your a name for your workout:
          <Field id="workoutName" type="text" name="workoutName" />
          {touched.workoutName && errors.workoutName && (
            <p className="errors"> {errors.workoutName} </p>
          )}
        </label>
        <Field className="muscle input" as="select" name="muscle">
          <option disabled>Choose a muscle group</option>
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
        </Field>
        <label htmlFor="sets">
          <Field className="input" id="sets" type="text" name="sets" />
          {touched.sets && errors.sets && (
            <p className="errors"> {errors.sets} </p>
          )}
        </label>
        <label htmlFor="reps">
          <Field className="input" id="reps" type="text" name="reps" />
          {touched.reps && errors.reps && (
            <p className="errors"> {errors.reps} </p>
          )}
        </label>
        <Field
          className="input"
          as="textarea"
          type="text"
          name="notes"
          placeholder="Notes"
        />
        <button type="submit">Add Workout</button>
      </Form>
      {workout.map(workout => (
        <ul key={workout.id}>
          <li>Name: {workout.workoutName}</li>
          <li>Muscle: {workout.muscle}</li>
          <li>Sets: {workout.sets}</li>
          <li>Reps: {workout.reps}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikWorkoutForm = withFormik({
  mapPropsToValues({ name, muscle, sets, reps, notes }) {
    return {
      name: name || "",
      muscle: muscle || "",
      sets: sets || "",
      reps: reps || "",
      notes: notes || ""
    };
  },
  validationSchema: Yup.object().shape({
    workoutName: Yup.string().required("Name is required!"),
    muscle: Yup.string().required(),
    sets: Yup.string().required(),
    reps: Yup.string().required()
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);

    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(WorkoutForm);

const mapStateToProps = state => {
  return {};
};
export default FormikWorkoutForm;
