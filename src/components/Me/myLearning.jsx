import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Dropdown,
  Form,
  Button,
  Carousel,
  Nav,
  Badge,
  Tabs,
  Tab,
  Card,
} from "react-bootstrap";
import SingleCourse from "../singleCourseInfo/SingleCourse";
import { RiShareForwardLine } from "react-icons/ri";

import "./me.css";
import "../Home/home.css";
import { connect } from "react-redux";
import Footer from "../Footer/Footer";
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


class myLearning extends Component {
  state = {};
  isProgressed=(id)=>{
    let myProgress= this.props.me.myProgress.find(item=> item.course._id === id)
  
  console.log("isprogresses?",myProgress)
  
    return  myProgress
    

  }

  learningHistoryCount=()=>{let completedCourses = this.props.me.myProgress.filter(item=> item.completePercentage===1 ) 
  return completedCourses.length}

  componentDidMount = () => {
		this.props.fetchMewithThunk()
		this.props.fetchMyProgresswithThunk()
    this.props.fetchCourseswithThunk()

	}

  render() {
    const {myProgress}= this.props.me
    const {savedVideos}= this.props.me.me
    return (
      <>
        <Container style={{marginTop:"52px"}} className="mt-4">
          <h4>My Learning</h4>
          <div className="myLearning"> 
          <Tabs
            defaultActiveKey="progress"
            id="myprogresss-tab"
            className="mt-2 pb-2"
          >
            <Tab eventKey="progress" title={`In Progress(${myProgress && myProgress.length})`}>
              <Row>
              {myProgress &&  myProgress.map(item=> 
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
                      video_thumbnail_img={item.course.video_thumbnail_img}
                      completed="false"
                      style="big"
                      isProgressed="true"/>
                      )}
                
             
              
          
              </Row>
            </Tab>
            <Tab eventKey="saved" title={`Saved(${savedVideos && savedVideos.length})`}>
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
    video_thumbnail_img={item.video_thumbnail_img}
    completed={ isProgressed.completePercentage===100 ?"true":"false"}
    style="big"
    isProgressed="true"/>
    :

    <SingleCourse
    courseId ={item._id} 
    duration={item.duration}
    tutorName={item.tutor.tutorName}
    tutorProfession={item.tutor.tutorProfession}
    videoName={item.videoName}
    createdAt={item.createdAt}
    video_thumbnail_img={item.video_thumbnail_img}
    completed="false"
    style="big"
    isProgressed="false"/>
                     } )}
             
         
             </Row>
            </Tab>
            <Tab eventKey="Learning History" title={`Learning History(${myProgress && this.learningHistoryCount()})`}>
            <Row>
            
            {myProgress && myProgress.map(item=> 
                     item.completePercentage===1 && 
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
                      video_thumbnail_img={item.course.video_thumbnail_img}
                      completed="true"
                      style="big"
                      isProgressed="true"/>
                      )}
                
             
              
             
         
             </Row>
                </Tab>
                <Tab eventKey="Skills" title="Skills ">
                <Row>
               
              
              
          
              </Row>
                </Tab>
          </Tabs>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(myLearning);
