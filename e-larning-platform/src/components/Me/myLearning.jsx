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
class myLearning extends Component {
  state = {};
  isProgressed=(id)=>{
    let myProgress= this.props.me.myProgress.find(item=> item.course._id === id)
  
  console.log("isprogresses?",myProgress)
  
    return  myProgress
    
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
            <Tab eventKey="progress" title="In Progress (1)">
              <Row>
              {myProgress &&  myProgress.map(item=> 
                        item.completePercentage!==100 && 
                     <SingleCourse
                      courseId ={item._id} 
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
                      style="big"
                      isProgressed="true"/>
                      )}
                
             
              
          
              </Row>
            </Tab>
            <Tab eventKey="saved" title="Saved (1) ">
            <Row>
               
            {savedVideos && savedVideos.map((item)=> {
  let isProgressed=this.isProgressed(item._id)


  return   isProgressed?



   <SingleCourse
    courseId ={item._id} 
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
    style="big"
    isProgressed="true"/>
    :

    <SingleCourse
    courseId ={item._id} 
    tutorName={item.tutor.tutorName}
    tutorProfession={item.tutor.tutorProfession}
    videoName={item.videoName}
    createdAt={item.createdAt}
    video_cover_img={item.video_cover_img}
    completed="false"
    style="big"
    isProgressed="false"/>
                     } )}
             
         
             </Row>
            </Tab>
            <Tab eventKey="Learning History" title="Learning History (1)">
            <Row>
               
            {myProgress && myProgress.map(item=> 
                     item.completePercentage===1 && 
                     <SingleCourse
                      courseId ={item._id} 
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
export default connect(mapStateToProps)(myLearning);
