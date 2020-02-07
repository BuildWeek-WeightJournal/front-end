import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { editWorkout } from "../actions/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const headerStyle = {
  margin: "150px 0 0 0"
};

const UpdateWorkout = props => {
  const [workout, setWorkout] = useState({
    id: "",
    user_id: null,
    name: "",
    reps: null,
    weight: null,
    body_region: "",
    date: ""
  });

  const workoutId = props.match.params.id;

  useEffect(() => {
    axiosWithAuth()
      .get(
        `https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/workout/${workoutId}`
      )
      .then(res => {
        setWorkout(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [workoutId]);

  const handleChanges = e => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    const userId = localStorage.getItem("userId");
    e.preventDefault();
    props.editWorkout(userId, workout);
    setTimeout(() => {
      props.history.push("/protected/my_workouts");
    }, 1000);
  };

  return (
    <div>
      <NavBar />
      <h1 style={headerStyle}>Log Completed Exercise</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="workout"
          placeholder="Name of Workout"
          value={workout.name}
          onChange={handleChanges}
        />
        <input
          as="select"
          name="body_region"
          placeholder="Body Region"
          value={workout.body_region}
          onChange={handleChanges}
        />
        <input
          type="number"
          name="weight"
          placeholder="Amount of weight"
          value={workout.weight}
          onChange={handleChanges}
        />
        <input
          type="number"
          name="reps"
          placeholder="Number of Reps"
          value={workout.reps}
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
