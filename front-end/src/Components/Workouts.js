import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import axios from 'axios';
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardDeck,
  Button
} from "reactstrap";

const Workouts = props => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const id = '';
    axios
      .get(
        `https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/:userId/${id}`
      )
      .then(res => {
        setWorkouts(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleDelete = id => {
    axios
      .delete(
        `https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/:workoutId/${id}`
      )
      .then(res => {
        props.history.go("/protected/my_workouts");
      })
      .catch(res => {
        console.log(res);
      });
  };

  return (
    <div>
      <h1>My Workouts</h1>
      {workouts.map(workoutList => {
        return (
          <div key={workoutList.id}>
            <CardDeck className="wrapper">
              <Card className="card-wrapper" key={workouts.id}>
                <CardBody className="card-body">
                  {/* <CardTitle>Date: {exerciseList.date}</CardTitle> */}
                  <CardTitle>Exercise: workoutList.workoutName}</CardTitle>
                  <CardTitle>Weight: {workoutList.weight}</CardTitle>
                  <CardSubtitle>Sets: {workoutList.sets}</CardSubtitle>
                  <CardSubtitle>Reps: {workoutList.reps}</CardSubtitle>
                  <CardSubtitle>
                    Journal Entry: {workoutList.notes}
                  </CardSubtitle>
                  <br />
                  <Button
                    onClick={() =>
                      props.history.push(`/update_workout/${workoutList.id}`)
                    }
                  >
                    Edit
                  </Button>
                  <br />
                  <Button onClick={() => handleDelete(workoutList.id)}>
                    Delete
                  </Button>
                  
                </CardBody>
              </Card>
            </CardDeck>
          </div>
        );
      })}
    </div>
  );
};

export default Workouts;
