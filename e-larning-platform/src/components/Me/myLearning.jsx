import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Carousel,
  Nav,
  
  Badge,
  Tabs,
  Tab,
Card
} from "react-bootstrap";
import SingleCourse from "../singleCourseInfo/SingleCourse"
import { Line, Circle } from "rc-progress";
import "./me.css";


import Footer from "../Footer/Footer";








class myLearning extends Component {
  state = {

  };




  render() {
    return (
      <>
   <Container>
 
          hello
          <div className="d-flex"></div>
          <SingleCourse style="big"/>
          <div
                      className="ml-auto d-inline"
                      style={{ color: "#554AC2" }}
                    >
                      <a>Show All (1) </a>
                    </div>
       
        </Container>
        <Footer/>
      </>
    );
  }
}
export default myLearning;
