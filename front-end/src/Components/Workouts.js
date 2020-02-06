import React, { useState, useEffect } from "react";
// <<<<<<< New-Robert-Stepanov
// import { axiosWithAuth } from "./utils/axiosWithAuth";
// import axios from 'axios';
// import {
//   Card,
//   CardTitle,
//   CardSubtitle,
//   CardBody,
//   CardDeck,
//   Button
// } from "reactstrap";

// const Workouts = props => {
//   const [workouts, setWorkouts] = useState([]);

//   useEffect(() => {
//     const id = '';
//     axios
//       .get(
//         `https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/:userId/${id}`
//       )
//       .then(res => {
//         setWorkouts(res.data);
//         console.log(res.data)
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }, []);

//   const handleDelete = id => {
//     axios
//       .delete(
//         `https://weightliftingjournal-buildweek.herokuapp.com/api/workouts/:workoutId/${id}`
//       )
//       .then(res => {
//         props.history.go("/protected/my_workouts");
//       })
//       .catch(res => {
//         console.log(res);
//       });
//   };
// =======

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
// <<<<<<< New-Robert-Stepanov
//       {workouts.map(workoutList => {
//         return (
//           <div key={workoutList.id}>
//             <CardDeck className="wrapper">
//               <Card className="card-wrapper" key={workouts.id}>
//                 <CardBody className="card-body">
//                   {/* <CardTitle>Date: {exerciseList.date}</CardTitle> */}
//                   <CardTitle>Exercise: workoutList.workoutName}</CardTitle>
//                   <CardTitle>Weight: {workoutList.weight}</CardTitle>
//                   <CardSubtitle>Sets: {workoutList.sets}</CardSubtitle>
//                   <CardSubtitle>Reps: {workoutList.reps}</CardSubtitle>
//                   <CardSubtitle>
//                     Journal Entry: {workoutList.notes}
//                   </CardSubtitle>
//                   <br />
//                   <Button
//                     onClick={() =>
//                       props.history.push(`/update_workout/${workoutList.id}`)
//                     }
//                   >
//                     Edit
//                   </Button>
//                   <br />
//                   <Button onClick={() => handleDelete(workoutList.id)}>
//                     Delete
//                   </Button>
                  
//                 </CardBody>
//               </Card>
//             </CardDeck>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Workouts;
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
