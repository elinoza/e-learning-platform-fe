import React, { Component } from "react";
import { Row, Col, Container, Tabs, Tab } from "react-bootstrap";

import Notes from "./Notes";
import Comments from "./Comments";
import OverView from "./overView";
import VideoNavBar from "./VideoNavBar";
import Video from "./Video";
import SideBar from "./SideBar";

import "./Learn.css";

import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchTheCoursewithThunk: (courseId) =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/videos/" + courseId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const currentCourse = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_CURRENT_COURSE",
          payload: currentCourse,
        });
        console.log("currentCourse from learn component ", currentCourse);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: currentCourse,
        });
      }
    }),
  fetchMyCourseProgress: (courseId) =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/myLearning/" + courseId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const progress = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_COURSE_PROGRESS",
          payload: progress,
        });

        

        console.log("progress ", progress);
       
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: progress,
        });
    
      }
    }),
});


const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],

  controls: true,
  responsive: true,
  preload: "metadata",


  // ,sources: [
  //   {
  //     src: 'https://res.cloudinary.com/elinoza/video/upload/v1615916859/413B3280-BC4B-4F40-B66D-12EE82275937_mv3bjq.mp4',
  //     type: 'video/mp4',
  //   },
  // ],
};

class Learn extends Component {
  state = {
    showSideBar: true,
    
  };
  triggerParentComponentforRedux=(setMode)=>{
    if(setMode=== true){
      let courseId = this.props.match.params.courseId;
      this.props.fetchMyCourseProgress(courseId);}
    

  }
  componentDidMount = () => {
    let courseId = this.props.match.params.courseId;
    this.props.fetchTheCoursewithThunk(courseId);
    this.props.fetchMyCourseProgress(courseId);
  };
  render() {
    const { currentCourse, currentCourseProgress } = this.props.player;

   
   
    console.log(this.props.player);
    return (
      
      <>


        <SideBar />

        <Row
          id="Main"
          style={{ marginTop: "52px" }}
          className={this.state.showSideBar === true ? "show" : ""}
        >
          <Col xs={12} className="player-col p-0">
            <VideoNavBar currentCourse={currentCourse} />

          
           {currentCourseProgress && currentCourseProgress._id !==undefined && currentCourse._id !==undefined  &&  
            <Video
            currentProgress={currentCourseProgress}
            currentCourse={currentCourse}
              {...videoJsOptions}
              triggerParentComponentforRedux={this.triggerParentComponentforRedux}
             
            /> }
          </Col>
          <Col xs={12} className="p-0">
            <div className="learn">
              <Container>
                <Tabs
                  defaultActiveKey="overview"
                  id="learn-tab"
                  className=" d-flex justify-content-center my-4"
                >
                  <Tab eventKey="overview" title="Overview">
                    <OverView currentCourse={currentCourse}/>
                  </Tab>
                  <Tab eventKey="qa" title="QA ">
                    <Comments />
                  </Tab>
                  <Tab eventKey="notebook" title="Notebook">
                    <Notes />
                  </Tab>
                  <Tab eventKey="transcript" title="Trancript ">
                    <Row></Row>
                  </Tab>
                </Tabs>
              </Container>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Learn);
