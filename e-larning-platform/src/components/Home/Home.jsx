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

import Footer from "../Footer/Footer";


import { GiTrophyCup } from "react-icons/gi";


import { Avatar } from "@material-ui/core";
import { Line, Circle } from "rc-progress";
import MultiCarousel from "./MultiCarousel";







class Home extends Component {
  state = {

  };




  render() {
    return (
      <>
        <Carousel>
          <Carousel.Item className="carousel-item m-3">
            <img
              className="d-block w-100 bg-image"
              src="https://mysominotes.files.wordpress.com/2017/07/powerpointlecture.jpg"
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
                    Released two weeks ago
                  </span>
                </h5>

                <h3 style={{ fontWeight: "600" }}>
                  Defining and Achieving Personal Goals
                </h3>
                <div className="d-flex">
                  <Avatar
                    src="https://upload.wikimedia.org/wikipedia/en/d/d7/Random_person_image.png"
                    className="navbar-logo m-0 mt-1 p-0 d-inline"
                  />
                  <div>
                    {" "}
                    <p
                      style={{ fontSize: "12px" }}
                      className="d-block ml-1 mb-0 p-0 "
                    >
                      Dorie Clark
                    </p>
                    <p
                      style={{ fontSize: "12px" }}
                      className="d-block ml-1 mb-0 p-0 "
                    >
                      Professor of Something
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-100 d-none d-lg-block car-cap-2">
                {" "}
                <img
                  className="d-block w-100 "
                  src="https://mysominotes.files.wordpress.com/2017/07/powerpointlecture.jpg"
                  alt="First slide"
                />
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <Container>
          <Row className=" border-bottom mt-5 ">
            <Col xs={12} md={6} className="  p-3">
              <h2 style={{ fontSize: "18px" }}>Set Weekly Goal</h2>
              <div className="d-flex flex-row justify-content-between border-top mt-4 pt-2">
                <div className="goal-parent m-0  ">
                  <Circle
                    percent="90"
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
                   <SingleCourse/>
                    <div
                      className="ml-auto d-inline"
                      style={{ color: "#554AC2" }}
                    >
                      <a>Show All (1) </a>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="saved" title="Saved">
                  <div className="d-flex  border-top pt-2">
                    {" "}
                    <Row>
                     
                      <SingleCourse/>
                 
                 
                    </Row>
                  
                   
                    
                    <div
                      className="ml-auto d-inline"
                      style={{ color: "#554AC2" }}
                    >
                      <a>Show All (1) </a>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>
      
      <div className="my-5 ">
        <h4>Top Picks For Hilal</h4>
        <MultiCarousel 
        title="top picks"/>
        </div>

        <div className="my-5 ">
        <h4>Because you watched java</h4>
        <MultiCarousel 
        title="java"/>
        </div>
        
        
         
        </Container>
        <Footer/>
      </>
    );
  }
}
export default Home;
