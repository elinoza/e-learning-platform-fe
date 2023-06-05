import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Carousel,
  Badge,
  Tabs,
  Tab
} from "react-bootstrap";
import "./home.css";
import SingleCourse from "../singleCourseInfo/SingleCourse";
import { format, parseISO,  intervalToDuration } from "date-fns";

import Footer from "../Footer/Footer";

import { GiTrophyCup } from "react-icons/gi";


import { Avatar } from "@material-ui/core";
import { Circle } from "rc-progress";
import MultiCarousel from "./MultiCarousel";
import GoalModal from "./GoalModal";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  goalModalToggle: (payload) =>
    dispatch({
      type: "TOGGLE_GOAL_MODAL",
      payload: payload,
    }),

  fetchMewithThunk: () =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const me = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_ME",
          payload: me,
        });
        console.log("me endpoint", me);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: me,
        });
      }
    }),
  fetchMyProgresswithThunk: () =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/myLearning", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const myLearning = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_MY_PROGRESS",
          payload: myLearning,
        });
        console.log("myLearning endpoint ", myLearning);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: myLearning,
        });
      }
    }),
  fetchCourseswithThunk: () =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/videos", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const courses = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_COURSES",
          payload: courses,
        });
        console.log("courses /videos endpoint ", courses);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: courses,
        });
      }
    }),
});

class Home extends Component {
  state = {
    categories: ["software", "Self-improvement"],
  };
  formatSeconds = (seconds) => {
    let duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    let formatted = `${duration.minutes}min `;
    return formatted;
  };
  calculateWeekWatch = () => {
    let start = new Date(Date.now() - 604800000); // 7 day ago
    let end = new Date(); //today's date
    let watchArray = this.props.me.me.myWatchProgress;
    console.log(start, end, watchArray);
    if (watchArray) {
      let filteredDates = watchArray.filter((item) => {
        let date = new Date(item.createdAt);
        console.log(date);
        return date >= start && date <= end;
      });
      if (filteredDates && filteredDates.length > 0) {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        let watchedThisWeek = filteredDates
          .map((item) => item.watch)
          .reduce(reducer);
        console.log(watchedThisWeek);
        return watchedThisWeek / 60;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  calculatelastWeekWatch = () => {
    let start = new Date(Date.now() - 1209600000); //14 day ago
    let end = new Date(Date.now() - 604800000); //7 day ago
    let watchArray = this.props.me.me.myWatchProgress;
    console.log(start, end, watchArray);
    if (watchArray) {
      let filteredDates = watchArray.filter((item) => {
        let date = new Date(item.createdAt);

        return date >= start && date <= end;
      });
      if (filteredDates && filteredDates.length > 0) {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        let watchedLastWeek = filteredDates
          .map((item) => item.watch)
          .reduce(reducer);

        return watchedLastWeek / 60;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  isProgressed = (id) => {
    let myProgress = this.props.me.myProgress.find(
      (item) => item.course._id === id
    );

    console.log("isprogresses?", myProgress);

    return myProgress;
  };

  componentDidMount = () => {
    this.props.fetchMewithThunk();
    this.props.fetchMyProgresswithThunk();
    this.props.fetchCourseswithThunk();

  };

  render() {
    const { savedVideos, myWeeklyGoal } = this.props.me.me;
    const { myProgress } = this.props.me;

    const { courses } = this.props.courses;
    console.log("saved", savedVideos);
    return (
      <>
        <Carousel fade="true " style={{ marginTop: "52px" }}>
          {courses &&
            courses.map((course) => (
              <Carousel.Item
                className="carousel-item m-3"
                onClick={() => this.props.history.push(`/learn/${course._id}`)}
              >
                <img
                  className="d-block w-100 bg-image"
                  src={course.video_cover_img}
                  alt="First slide"
                />
                <Carousel.Caption className="d-flex flex-row justify-content-between  ">
                  <div className="w-100 d-flex flex-column justify-content-between text-left car-cap-1 ">
                    <h5>
                      <Badge
                        style={{
                          backgroundColor: "purple",
                          marginRight: "3px",
                        }}
                      >
                        Popular
                      </Badge>
                      <Badge
                        style={{ backgroundColor: "green", marginRight: "3px" }}
                      >
                        New
                      </Badge>
                      <span className="text-near-badge">
                        Released at{" "}
                        {format(parseISO(course.createdAt), "MM/dd/yyyy")}
                      </span>
                    </h5>

                    <h3 style={{ fontWeight: "600" }}>{course.videoName}</h3>
                    <div className="d-flex">
                      <Avatar
                        src={course.tutor.tutorImg}
                        className="navbar-logo m-0 mt-1 p-0 d-inline"
                      />
                      <div>
                        {" "}
                        <p
                          style={{ fontSize: "12px" }}
                          className="d-block ml-1 mb-0 p-0 "
                        >
                          {course.tutor.tutorName}
                        </p>
                        <p
                          style={{ fontSize: "12px" }}
                          className="d-block ml-1 mb-0 p-0 "
                        >
                          {course.tutor.tutorProfession}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-100 d-none d-lg-block car-cap-2">
                    {" "}
                    <img
                      className="d-block w-100 "
                      src={course.video_thumbnail_img}
                      alt="tiny img"
                      style={{ height: "13vw", objectFit: "contain" }}
                    />
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
        </Carousel>

        <Container>
          <Row className=" border-bottom mt-5 ">
            <Col xs={12} md={6} className="  p-3">
              <h2 style={{ fontSize: "18px" }}>Weekly Goal</h2>
              <Row>
                <Col md={5}>
                {myWeeklyGoal && myWeeklyGoal !== 0 ? 
                  <div className="goal-parent m-0 position-relative
                    ">
                    <Circle
                      percent={(this.calculateWeekWatch() / myWeeklyGoal) * 100}
                      strokeWidth="6"
                      strokeColor="#0573B1"
                      id="goal-progress"
                    />
                 
                    <div className="cup-container">
                      <div className="cup-content">
                    
                      <>
                      <p style={{fontWeight:"bold",fontSize:"18px",margin:"0px"}}>
                        {Math.round(this.calculateWeekWatch()) +
                          "/" +
                          myWeeklyGoal}
                        
                      </p>
                      <span className="text-muted">minutes</span></>
                 
                    
                    </div> </div>
                  </div>
                  :  
                  
                  <div className="goal-parent m-0 position-relative">
                    <Circle
                      percent="0"
                      strokeWidth="1"
                      strokeColor="#0573B1"
                      id="goal-progress"
                    />
                 
                    <div className="cup-container">
                      <div className="cup-content">
                    
                  
                      <GiTrophyCup id="goal-cup" />
                 
                    
                    </div> </div>
                  </div>
                     
                  }
                </Col>
                <Col md={7}>
                  {" "}
                  {myWeeklyGoal && myWeeklyGoal !== 0 ? (
                    <div>
                      <div className="d-flex">
                        {" "}
                        {/* <p>{Date.now() - 604800000}-{Date.now()} </p> */}
                        <Button
                          style={{
                            backgroundColor: "transparent",
                            border: "transparent",
                            color: "#0973B1",
                            fontWeight: "bold",
                            marginLeft: "auto",
                          }}
                          onClick={() => this.props.goalModalToggle(true)}
                        >
                          Edit goal
                        </Button>
                      </div>
                      {console.log("1", this.calculateWeekWatch())}
                      {console.log("2", this.calculatelastWeekWatch())}

                      {this.calculateWeekWatch() >= myWeeklyGoal ? (
                        <p>Congratulations Hilal you did it!</p>
                      ) : (
                        <p>
                          Keep going! Learn for{" "}
                          {Math.round(myWeeklyGoal - this.calculateWeekWatch())}{" "}
                          minutes more to hit your goal!{" "}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="ml-4 mt-4 ">
                      <p>
                        We’ll help you track your progress and remind you to
                        keep learning
                        {console.log("1", this.calculateWeekWatch())}
                        {console.log("2", this.calculatelastWeekWatch())}
                      </p>
                      <Button
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid #0973B1",
                          color: "#0973B1",
                          fontWeight: "bold",
                        }}
                        onClick={() => this.props.goalModalToggle(true)}
                      >
                        Set a goal
                      </Button>
{this.props.goal.show_goal_Modal=== true &&   <GoalModal />}
                     
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className=" myprogress-home p-3 ">
              <Tabs
                defaultActiveKey="progress"
                id="myprogresss-tab"
                className="mt-2"
              >
                <Tab eventKey="progress" title="In Progress">
                  <div className="d-flex  border-top pt-2">
                    {" "}
                    <Row>
                      {myProgress &&
                        myProgress.map(
                          (item) =>
                            item.completePercentage < 1 && (
                              <SingleCourse
                                courseId={item._id}
                                duration={item.duration}
                                tutorName={item.course.tutor.tutorName}
                                tutorProfession={
                                  item.course.tutor.tutorProfession
                                }
                                videoName={item.course.videoName}
                                createdAt={item.course.createdAt}
                                updatedAt={item.course.updatedAt}
                                remainingTime={item.remainingTime}
                                secondLeft={item.secondLeft}
                                playlistIndex={item.playlistIndex}
                                completePercentage={item.completePercentage}
                                video_thumbnail_img={
                                  item.course.video_thumbnail_img
                                }
                                completed="false"
                                isProgressed="true"
                                style="small"
                              />
                            )
                        )}
                    </Row>
                    <div
                      className="ml-auto d-inline w-75"
                      style={{ color: "#554AC2" }}
                    >
                      <a>Show All {myProgress && myProgress.length}</a>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="saved" title="Saved">
                  <div className="d-flex  border-top pt-2">
                    {" "}
                    <Row>
                      {savedVideos &&
                        savedVideos.map((item) => {
                          let isProgressed = this.isProgressed(item._id);

                          return isProgressed ? (
                            <SingleCourse
                              courseId={item._id}
                              duration={item.duration}
                              tutorName={item.tutor.tutorName}
                              tutorProfession={item.tutor.tutorProfession}
                              videoName={item.videoName}
                              createdAt={item.createdAt}
                              updatedAt={item.updatedAt}
                              remainingTime={isProgressed.remainingTime}
                              secondLeft={isProgressed.secondLeft}
                              playlistIndex={isProgressed.playlistIndex}
                              completePercentage={
                                isProgressed.completePercentage
                              }
                              video_thumbnail_img={item.video_thumbnail_img}
                              completed={
                                isProgressed.completePercentage >=1
                                  ? "true"
                                  : "false"
                              }
                              isProgressed="true"
                              style="small"
                            />
                          ) : (
                            <SingleCourse
                              courseId={item._id}
                              duration={item.duration}
                              tutorName={item.tutor.tutorName}
                              tutorProfession={item.tutor.tutorProfession}
                              videoName={item.videoName}
                              createdAt={item.createdAt}
                              updatedAt={item.updatedAt}
                              video_thumbnail_img={item.video_thumbnail_img}
                              completed="false"
                              isProgressed="false"
                              style="small"
                            />
                          );
                        })}
                    </Row>
                    <div
                      className="ml-auto d-inline w-75"
                      style={{ color: "#554AC2" }}
                    >
                      <a>Show All {savedVideos && savedVideos.length}</a>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>

          <div className="my-5  blur-container">
            <h4>Top Picks For Hilal</h4>

            {this.state.categories.map((category) => (
              <MultiCarousel
                style={{ marginBottom: "10rem", marginTop: "3rem" }}
                title={category.toUpperCase() + ` Related Courses`}
                category={category}
              />
            ))}
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
