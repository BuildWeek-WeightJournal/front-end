import React, { useState, useEffect } from "react";
// import anime from './anime-master/lib/anime.es.js';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import{
  InputForm,
  InputField,
  Button,
} from "./styles";
import styled from "styled-components";


//Select button with query selector then use animejs library to add animation
// var elements = document.querySelectorAll('button');
// anime({
//   targets: elements,
//   translateX: 270
// });
const cardStyle={
  margin: "auto",
  padding: "25px",
  width: "300px",
  border: " 1px solid #00a35e",
  borderradius: "1px",
};
const containerStyle={
  display: "flex",
  flexdirection: "row",
  margin: "auto",
  width: "1300px",
};
const WorkoutForm = ({ values, errors, touched, status }) => {
const [workout, setWorkout] = useState([{}]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setWorkout(workout => 
    [...workout, status])
},[status]);
    return(
        <div className="workout-form">
            <InputForm>
                <label htmlFor="name">
                    Please enter your a name for your workout:
                <Field id ="name" type="text" name="name" placeholder="name"/>
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
                <Field id ="weight" type="weight" name="weight" placeholder="weight"/>
                {touched.weight && errors.weight && (
            <p className="errors"> {errors.weight} </p>
          )}
                </label>
                <label htmlFor="reps">
                <InputField id ="reps" type="text" name="reps" placeholder="reps"/>
                {touched.reps && errors.reps && (
            <p className="errors"> {errors.reps} </p>
          )}
                </label>
                <Button type="submit">Add Workout</Button>
            </InputForm>
    <Container>
    <Row>
    <Col xs="12" sm="6" md="4" xl="3" style={containerStyle}> 
  {workout.map(props => (
      <Card style={cardStyle} key={props.id}>
        <CardTitle>Name: {props.name}</CardTitle>
        <CardSubtitle>Body Region: {props.body_region}</CardSubtitle>
        <CardSubtitle>Weight: {props.weight}</CardSubtitle>
        <CardSubtitle>Reps: {props.reps}</CardSubtitle>
        <button> Edit Workout</button>
	   </Card>
	))}
    </Col>
  </Row>
  </Container>
        </div>
    )
};
const FormikWorkoutForm = withFormik({
    mapPropsToValues({name, body_region, weight, reps}) {
      return {
        name: name || "",
        body_region: body_region || "",
        weight: weight || "",
        reps: reps || "",
      };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required!"),
        weight: Yup.string().required("Weight is required!"),
        reps: Yup.string().required("Number of reps is required!"),
      }),

      handleSubmit(values, {setStatus, resetForm}) {
        console.log("submitting", values);
        axios
        .post("https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/:userId", values)
          .then(res => {
            console.log("success", res);
            setStatus(res.data)
            resetForm();
          })
          .catch(err => console.log(err.response));
      }
})(WorkoutForm);
export default FormikWorkoutForm;