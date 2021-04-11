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
import { GrFormCheckmark } from "react-icons/gr";
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
  fetchSkillswithThunk: () =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/skills", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const skills = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_SKILLS",
          payload: skills,
        });
        console.log("skills ", skills);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: skills,
        });
      }
    }),
  
});

class myLearning extends Component {
  state = {};
  isProgressed = (id) => {
    let myProgress = this.props.me.myProgress.find(
      (item) => item.course._id === id
    );

    console.log("isprogresses?", myProgress);

    return myProgress;
  };

  learningHistoryCount = () => {
    let completedCourses = this.props.me.myProgress.filter(
      (item) => item.completePercentage === 1
    );
    return completedCourses.length;
  };

  setGoalSkill = async (skill) => {
    try {
      console.log(skill);
      let data = {
        skillName: skill.skillName,
        category: skill.category,
      };

      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/me/goalSkill", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        this.props.fetchMewithThunk();
      } else {
        console.log("save error", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  isItGoalItem=(skill)=>{
    let res= this.props.me.me.goalSkills.find((goalItem) =>new String(goalItem.skillName).valueOf() == new String(skill.skillName).valueOf()
    )


 return res
    
  }

  removeGoalSkill = async (skill) => {
    try {
      console.log(skill);
    

      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/me/goalSkill/" +skill._id , {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
        
      });

      if (response.ok) {
        this.props.fetchMewithThunk();
        this.props.fetchSkillswithThunk();

        console.log("skill removed-->",skill.skillName)
      } else {
        console.log("save error", response);
      }
    } catch (error) { 
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.props.fetchMewithThunk();
    this.props.fetchMyProgresswithThunk();
    this.props.fetchCourseswithThunk();
    this.props.fetchSkillswithThunk();
  
  };

  render() {
    const { myProgress } = this.props.me;
    const { savedVideos } = this.props.me.me;
    const { skills, goalSkills } = this.props.me.me;
    console.log("skills render", this.props.skills);

    return (
      <>
        <Container style={{ marginTop: "52px" }} className="mt-4">
          <h4>My Learning</h4>
          <div className="myLearning">
            <Tabs
              defaultActiveKey="progress"
              id="myprogresss-tab"
              className="mt-2 pb-2"
            >
              <Tab
                eventKey="progress"
                title={`In Progress(${myProgress && myProgress.length})`}
              >
                <Row>
                  {myProgress &&
                    myProgress.map(
                      (item) =>
                        item.completePercentage !== 1 && (
                          <SingleCourse
                            courseId={item._id}
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
                            video_thumbnail_img={
                              item.course.video_thumbnail_img
                            }
                            completed="false"
                            style="big"
                            isProgressed="true"
                          />
                        )
                    )}
                </Row>
              </Tab>
              <Tab
                eventKey="saved"
                title={`Saved(${savedVideos && savedVideos.length})`}
              >
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
                          completePercentage={isProgressed.completePercentage}
                          video_thumbnail_img={item.video_thumbnail_img}
                          completed={
                            isProgressed.completePercentage === 1
                              ? "true"
                              : "false"
                          }
                          style="big"
                          isProgressed="true"
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
                          style="big"
                          isProgressed="false"
                        />
                      );
                    })}
                </Row>
              </Tab>
              <Tab
                eventKey="Learning History"
                title={`Learning History(${
                  myProgress && this.learningHistoryCount()
                })`}
              >
                <Row>
                  {myProgress &&
                    myProgress.map(
                      (item) =>
                        item.completePercentage === 1 && (
                          <SingleCourse
                            courseId={item._id}
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
                            video_thumbnail_img={
                              item.course.video_thumbnail_img
                            }
                            completed="true"
                            style="big"
                            isProgressed="true"
                          />
                        )
                    )}
                </Row>
              </Tab>
              <Tab eventKey="Skills" title="Skills ">
                <div className="px-4 text-muted mt-3">
                  <div>
                    <h8
                      className="d-block"
                      style={{ marginBottom: "30px", fontWeight: "bold" }}
                    >
                      My Skills
                    </h8>
                    {skills &&
                      skills.map((skill) => (
                        <p className="d-inline  skillset-tags mt-3 ">
                          <a>{skill.skillName} </a>
                        </p>
                      ))}{" "}
                  </div>
               {goalSkills && goalSkills.length >0 &&  <div className="mt-4">
                    <h8
                      className="d-block"
                      style={{ marginBottom: "30px", fontWeight: "bold" }}
                    >
                      Skills I’m interested in
                    </h8>
                    <div className="skillset-wrap">
                    {
                      goalSkills.map((skill) => (
                        <p className="d-inline  skill-set-tags-fill mt-3 "  onClick={() => this.removeGoalSkill(skill)}>
                          <a>{skill.skillName} x</a>
                        </p>
                      ))} </div>
                  </div>
                  }     
                  <div className="mt-4">
                    <h8
                      className="d-block"
                      style={{ marginBottom: "30px", fontWeight: "bold" }}
                    >
                      Suggested Skills
                    </h8>

                    <Form.Control
                      id="text"
                      type="text"
                      placeholder="Find Skills..."
                      className="skill-form-element mb-4  "
                      // value={this.state.comment.text}
                      // onChange={this.updateField}
                    />
<div className="skillset-wrap">
                    {this.props.skills.skills &&
                      this.props.skills.skills.slice(0, 10).map(
                        (skill) =>


                          goalSkills && this.isItGoalItem(skill)!== undefined 
                          ? (
                           
                              <p
                                className="d-inline  skill-set-tags-fill  "
                                style={{backgroundColor:" #485D69"}}
                                onClick={() => this.removeGoalSkill(this.isItGoalItem(skill))}
                              >
                                <a  style={{color:"white"}}>
                                  {skill.skillName}{" "}
                                 
                                </a>
                                <GrFormCheckmark
                                      style={{color:"white",fontSize:"14px"}}
                                  />
                              </p>
                            ) : (  
                              <p
                                className="d-inline  skillset-tags-me  "
                                onClick={() => this.setGoalSkill(skill)}
                              >
                                <a className="">{skill.skillName} +</a>
                              </p>
                            )
                         
                      )}
                      </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(myLearning);
