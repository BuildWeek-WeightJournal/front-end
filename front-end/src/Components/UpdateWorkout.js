import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { editWorkout } from "../actions/actions";
import { connect } from "react-redux";

const UpdateWorkout = props => {
  const [workout, setWorkout] = useState({
    workoutName: "",
    muscle: "",
    sets: "",
    reps: "",
    note: ""
  });

  const testWorkout = {
    workoutName: workout.workoutName,
    muscle: workout.muscle,
    sets: workout.sets,
    reps: workout.reps,
    note: workout.note,
    id: workout.id
  };

  useEffect(() => {
    axios
      .get(
        `https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/${props.match.params.userId}`
      )
      .then(res => {
        console.log(res);
        setWorkout(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const handleChanges = e => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.editWorkout(workout.id, testWorkout);
    setTimeout(() => {
      props.history.push("/protected/workout");
    }, 1000);
    setWorkout({
      workoutName: "",
      muscle: "",
      sets: "",
      reps: "",
      note: "",
      id: ""
    });
  };

  return (
    <div>
      <NavBar />
      <h1>Log Completed Exercise</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="workout"
          placeholder="Name of Workout"
          value={workout.workoutName}
          onChange={handleChanges}
        />
        <input
          type="text"
          name="muscle"
          placeholder="Muscle Group"
          value={workout.muscle}
          onChange={handleChanges}
        />
        <input
          type="text"
          name="sets"
          placeholder="Sets"
          value={workout.sets}
          onChange={handleChanges}
        />
        <input
          type="number"
          name="reps"
          placeholder="Number of Reps"
          value={workout.reps}
          onChange={handleChanges}
        />

        <input
          type="text"
          name="note"
          placeholder="Summarize how your workout went"
          value={workout.note}
          onChange={handleChanges}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    exerciseList: state.exerciseList,
    isFetching: state.isFetching
  };
};

export default connect(mapStateToProps, { editWorkout })(UpdateWorkout);
