import React, { useState, useEffect } from "react";

import SideDrawer from "../Components/SideDrawer/SideDrawer";
import BackDrop from "../Components/BackDrop/BackDrop";
import NavBar from "./NavBar";
import Anime from "react-anime";

//from dependencies
import { editWorkout, fetchWorkouts, deleteWorkout } from "../actions/actions";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardTitle, CardSubtitle } from "reactstrap";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import axios from "axios";

const headerStyle = {
  margin: "150px 0 0 0"
};
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
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  //Code for the side drawer

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(prevState => {
      return !prevState;
    });
  };

  const backDropClickhandler = () => {
    setSideDrawerOpen(false);
  };

  let sideDrawer;
  let backDrop;

  if (sideDrawerOpen) {
    sideDrawer = <SideDrawer />;
    backDrop = <BackDrop click={backDropClickhandler} />;
  }
  const userId = localStorage.getItem("userId");

  // const handleDelete = (e, id) => {
  //   e.preventDefault();
  //   axiosWithAuth().delete(
  //     `https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/${id}`
  //   );
  // };

  console.log(localStorage);
  useEffect(() => {
    axiosWithAuth()
      .get(`/api/workouts/${userId}`)
      .then(res => {
        setWorkouts(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [workouts]);

  const handleDelete = id => {
    axios
      .delete(
        `https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/${id}`
      )
      .catch(res => {
        console.log(res);
      });
  };

  return (
    <div>
      <NavBar drawerClickHandler={drawerToggleClickHandler} />
      {sideDrawer}
      {backDrop}
      <Anime rotate={720}>
      <h1 style={headerStyle}>My Workouts</h1>
      </Anime>
      <Container>
        <Row>
          <Col xs="12" sm="6" md="4" xl="3" style={containerStyle}>
            {workouts.map(data => (
              <Card style={cardStyle} key={data.id}>
                <CardTitle>Name: {data.name}</CardTitle>
                <CardSubtitle>Body Region: {data.body_region}</CardSubtitle>
                <CardSubtitle>Weight: {data.weight}</CardSubtitle>
                <CardSubtitle>Reps: {data.reps}</CardSubtitle>
                <button
                  onClick={() =>
                    props.history.push(`/update_workout/${data.id}`)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
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
    isFetching: state.isFetching,
    isDeleting: state.isDeleting
  };
};

export default connect(mapStateToProps, {
  editWorkout,
  fetchWorkouts,
  deleteWorkout
})(Workouts);
