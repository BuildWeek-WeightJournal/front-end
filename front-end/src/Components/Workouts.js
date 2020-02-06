import React, { useState, useEffect } from "react";

//components
import NavBar from "./NavBar";

//redux
import { editWorkout, fetchWorkouts } from "../actions/actions";
import { connect } from "react-redux";

const Workouts = props => {
  const [workouts, setWorkouts] = useState([]);

  const id = props.match.params.id;

  useEffect(() => {
    if (props.exerciseList === 0) {
      props.fetchWorkouts(id);
    }
    setWorkouts(props.exerciseList);
  }, [props, props.exerciseList]);

  console.log(setWorkouts);

  return (
    <div>
      <NavBar />
      <h1>My Workouts</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    exerciseList: state.exerciseList,
    isFetching: state.isFetching
  };
};

export default connect(mapStateToProps, { editWorkout, fetchWorkouts })(
  Workouts
);
