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

import Footer from "../Footer/Footer";

class myLearning extends Component {
  state = {};

  render() {
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
               
                <SingleCourse completed = "false" style="big" />
              
          
              </Row>
            </Tab>
            <Tab eventKey="saved" title="Saved (1) ">
            <Row>
               
               <SingleCourse completed = "false" style="big" />
             
         
             </Row>
            </Tab>
            <Tab eventKey="Learning History" title="Learning History (1)">
            <Row>
               
               <SingleCourse completed = "true" style="big" />
             
         
             </Row>
                </Tab>
                <Tab eventKey="Skills" title="Skills ">
                <Row>
               
                <SingleCourse style="big" />
              
          
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
export default myLearning;
