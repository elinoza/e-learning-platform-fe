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
  Tab,
Card
} from "react-bootstrap";
import "./home.css";
import SingleCourse from "../singleCourseInfo/SingleCourse"
import { format,parseISO } from 'date-fns'

import Footer from "../Footer/Footer";


import { GiTrophyCup } from "react-icons/gi";


import { Link } from "react-router-dom"

import { Avatar } from "@material-ui/core";
import { Line, Circle } from "rc-progress";
import MultiCarousel from "./MultiCarousel";
import { connect } from "react-redux";


const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
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
          payload: myLearning ,
        });
        console.log("myLearning endpoint ", myLearning );
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: myLearning ,
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
          payload: courses ,
        });
        console.log("courses /videos endpoint ", courses );
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: courses ,
        });
      }
    }),


});




class Home extends Component {
  state = {

  };



isProgressed=(id)=>{
  let myProgress= this.props.me.myProgress.find(item=> item.course._id === id)

console.log("isprogresses?",myProgress)

  return  myProgress
  
}

  componentDidMount = () => {
		this.props.fetchMewithThunk()
		this.props.fetchMyProgresswithThunk()
    this.props.fetchCourseswithThunk()

	}




  render() {
    const {savedVideos}= this.props.me.me
    const {myProgress}= this.props.me
   
    
    const {courses}= this.props.courses
    console.log("saved",savedVideos)
    return (
      <>
        <Carousel fade="true "style={{marginTop:"52px"}}>
          {courses && courses.map(course=> 
          <Carousel.Item  className="carousel-item m-3"  onClick={()=>this.props.history.push(`/learn/${course._id}`)}>
            <img
              className="d-block w-100 bg-image"
              src={course.video_cover_img}
              alt="First slide"
            />
            <Carousel.Caption className="d-flex flex-row justify-content-between  ">
              <div className="w-100 d-flex flex-column justify-content-between text-left car-cap-1 ">
                <h5>
                  <Badge
                    style={{ backgroundColor: "purple", marginRight: "3px" }}
                  >
                    Popular
                  </Badge>
                  <Badge
                    style={{ backgroundColor: "green", marginRight: "3px" }}
                  >
                    New
                  </Badge>
                  <span className="text-near-badge">
                    Released at {format(parseISO(course.createdAt),'MM/dd/yyyy')}
                  </span>
                </h5>

                <h3 style={{ fontWeight: "600" }}>
                 {course.videoName}
                </h3>
                <div className="d-flex">
                  <Avatar
                    src= {course.tutor.tutorImg}
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
                  src= {course.video_cover_img}
                  alt="tiny img"
                  style={{ height: "13vw",
                 objectFit: "cover"}}
                />
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          )}
        </Carousel>

        <Container>
          <Row className=" border-bottom mt-5 ">
            <Col xs={12} md={6} className="  p-3">
              <h2 style={{ fontSize: "18px" }}>Set Weekly Goal</h2>
              <div className="d-flex flex-row justify-content-between border-top mt-4 pt-2">
                <div className="goal-parent m-0  ">
                  <Circle
                    percent="70"
                    strokeWidth="6"
                    strokeColor="#0573B1"
                    id="goal-progress"
                  />
                  <GiTrophyCup id="goal-cup" />
                </div>
                <div className="ml-4 mt-4 ">
                  <p>
                    We’ll help you track your progress and remind you to keep
                    learning
                  </p>
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #0973B1",
                    }}
                  >
                    <span style={{ color: "#0973B1", fontWeight: "bold" }}>
                      Set a goal
                    </span>
                  </Button>
                </div>
              </div>
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
                      {myProgress  && myProgress.map(item=> 
                 

                       item.completePercentage!==100 &&
            
                     
                     <SingleCourse
                      courseId ={item._id}
                      duration={item.duration} 
                      tutorName={item.course.tutor.tutorName}
                      tutorProfession={item.course.tutor.tutorProfession}
                      videoName={item.course.videoName}
                      createdAt={item.course.createdAt}
                      updatedAt={item.course.updatedAt}
                      remainingTime={item.remainingTime}
                      secondLeft={item.secondLeft}
                      playlistIndex={item.playlistIndex}
                      completePercentage={item.completePercentage}
                      video_cover_img={item.course.video_cover_img}
                      completed="false"
                      isProgressed="true"
                      style="small"/>
                   
                      )}
                
                   </Row>
                 
                    <div
                      className="ml-auto d-inline w-75"
                      style={{ color: "#554AC2" }}
                    >
                      <a>Show All {savedVideos && savedVideos.length}</a>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="saved" title="Saved">
                  <div className="d-flex  border-top pt-2">
                    {" "}
                    <Row>
                     
                    {savedVideos && savedVideos.map((item)=> {
  let isProgressed=this.isProgressed(item._id)


  return   isProgressed?



   <SingleCourse
    courseId ={item._id} 
    duration={item.duration}
    tutorName={item.tutor.tutorName}
    tutorProfession={item.tutor.tutorProfession}
    videoName={item.videoName}
    createdAt={item.createdAt}
    remainingTime={isProgressed.remainingTime}
    secondLeft={isProgressed.secondLeft}
    playlistIndex={isProgressed.playlistIndex}
    completePercentage={isProgressed.completePercentage}
    video_cover_img={item.video_cover_img}
    completed={ isProgressed.completePercentage===100 ?"true":"false"}
    isProgressed="true"
    style="small"/>
    
    :

    <SingleCourse
    courseId ={item._id} 
    duration={item.duration}
    tutorName={item.tutor.tutorName}
    tutorProfession={item.tutor.tutorProfession}
    videoName={item.videoName}
    createdAt={item.createdAt}
    video_cover_img={item.video_cover_img}
    completed="false"
    isProgressed="false"
    style="small"/>
                     } )}


                    
              



                   
                 
                    </Row>
                  
                   
                    
                    <div
                      className="ml-auto d-inline w-75"
                      style={{ color: "#554AC2" }}
                    >
                      <a>Show All {savedVideos &&savedVideos.length}</a>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>
      
      <div className="my-5 ">
        <h4>Top Picks For Hilal</h4>
        <MultiCarousel 
         
        title="Software Related Courses" category="software"/>

<MultiCarousel 
         
         title="self-improvement" category="Self-improvement"/>
        </div>

    
        
        
         
        </Container>
        <Footer/>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
