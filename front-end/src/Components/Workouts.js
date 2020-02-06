import React, { useState, useEffect } from "react";

//components
import NavBar from "./NavBar";

//from dependencies
import { editWorkout, fetchWorkouts } from "../actions/actions";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardTitle, CardSubtitle } from "reactstrap";

const cardStyle = {
  margin: "auto",
  padding: "25px",
  width: "300px",
  border: " 1px solid #00a35e",
  borderradius: "1px"
};
const containerStyle = {
  display: "flex",
  flexdirection: "row",
  margin: "auto",
  width: "1300px"
};

const Workouts = props => {
  const [workouts, setWorkouts] = useState([]);

  const userId = localStorage.getItem("userId");

  console.log(localStorage);
  useEffect(() => {
    if (props.exerciseList === 0) {
      props.fetchWorkouts(userId);
    }
    setWorkouts(props.exerciseList);
    console.log(props.exerciseList);
  }, [props, props.exerciseList]);

  return (
    <div>
      <NavBar />
      <h1>My Workouts</h1>
      <Container>
        <Row>
          <Col xs="12" sm="6" md="4" xl="3" style={containerStyle}>
            {workouts.map(data => (
              <Card style={cardStyle} key={data.id}>
                <CardTitle>Name: {data.name}</CardTitle>
                <CardSubtitle>Body Region: {data.body_region}</CardSubtitle>
                <CardSubtitle>Weight: {data.weight}</CardSubtitle>
                <CardSubtitle>Reps: {data.reps}</CardSubtitle>
                <button> Edit Workout</button>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
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
