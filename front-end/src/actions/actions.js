import { axiosWithAuth } from "../Components/utils/axiosWithAuth";
import axios from "axios";

export const POST_WORKOUT_START = "POST_WORKOUT_START";
export const POST_WORKOUT_SUCCESS = "POST_WORKOUT_SUCCESS";
export const POST_WORKOUT_ERROR = "POST_WORKOUT_ERROR";

export const postWorkout = workoutValues => dispatch => {
  dispatch({ type: POST_WORKOUT_START });
  axios
    .post(
      "https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/:userId",
      workoutValues
    )
    .then(res => {
      dispatch({ type: POST_WORKOUT_SUCCESS, payload: res.data });
      console.log("It worked", res);
    })
    .catch(err => {
      console.log("Something went wrong!", err);
      dispatch({ type: POST_WORKOUT_ERROR, payload: err.res });
    });
};

export const FETCH_WORKOUT_START = "FETCH_WORKOUT_START";
export const FETCH_WORKOUT_SUCCESS = "FETCH_WORKOUT_START";
export const FETCH_WORKOUT_FAILURE = "FETCH_WORKOUT_FAILURE";

export const fetchWorkouts = id => dispatch => {
  dispatch({ type: FETCH_WORKOUT_START });

  axiosWithAuth()
    .get(`/api/workouts/${id}`)
    .then(res => dispatch({ type: FETCH_WORKOUT_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: FETCH_WORKOUT_FAILURE, payload: err }));
};

export const DELETE_WORKOUT_START = "DELETE_WORKOUT_START";
export const DELETE_WORKOUT_SUCCESS = " DELETE_WORKOUT_SUCCESS";
export const DELETE_WORKOUT_ERROR = "DELETE_WORKOUT_ERROR";

export const deleteWorkout = (id, props) => dispatch => {
  dispatch({ type: DELETE_WORKOUT_START });
  axios
    .delete(
      "https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/:workoutId"
    )
    .then(res => {
      console.log(res);
      dispatch({ type: DELETE_WORKOUT_SUCCESS, payload: id });
      props.history.push("/protected/my_workouts");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_WORKOUT_ERROR, payload: console.err });
    });
};

export const EDIT_WORKOUT_START = "EDIT_WORKOUT_START";
export const EDIT_WORKOUT_SUCCESS = "EDIT_WORKOUT_SUCCESS";
export const EDIT_WORKOUT_ERROR = "EDIT_WORKOUT_ERROR";

export const editWorkout = (id, workoutValues) => dispatch => {
  dispatch({ type: EDIT_WORKOUT_START });
  axios
    .put(
      `https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/${id}`,
      workoutValues
    )
    .then(res => {
      console.log(res);
      dispatch({ type: EDIT_WORKOUT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: EDIT_WORKOUT_ERROR, payload: err });
    });
};
