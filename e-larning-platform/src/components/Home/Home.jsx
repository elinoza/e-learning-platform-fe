import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Carousel,
  Badge,
  Tabs,Tab
} from "react-bootstrap";
import { GiTrophyCup } from "react-icons/gi";
import { Avatar } from "@material-ui/core";
import { Line, Circle } from "rc-progress";
// import { AiFillLinkedin} from 'react-icons/ai';
// import downloadAppStore from "../assets/downloadAPPstore.png";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import logo from "../assets/Instagram-Logo.png";
// import {FcGoogle  } from "react-icons/fc";
// import Footer from "./Footer"
import "./home.css";

class Home extends Component {
  state = {};

  render() {
    return (
      <>
        <Carousel>
          <Carousel.Item className="carousel-item">
            <img
              className="d-block w-100 bg-image"
              src="https://mysominotes.files.wordpress.com/2017/07/powerpointlecture.jpg"
              alt="First slide"
            />
            <Carousel.Caption className="d-flex flex-row justify-content-between ">
              <div className="w-100 d-flex flex-column justify-content-between text-left ">
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

              <div className="w-100 d-none d-lg-block">
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
              <h2>Set Weekly Goal</h2>
              <div className="d-flex flex-row justify-content-between border-top pt-2">
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
                    <span style={{ color: "#0973B1" }}>Set a goal</span>
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6} className="  p-3 ">
            
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">

  <Tab eventKey="profile" title="In Progress">
  <div className="d-flex border-top pt-2">
                {" "}
                <div
                  className="d-inline border mr-2"
                  style={{ width: "98px", height: "55px" }}
                >
                  <img
                    className="d-block w-100 "
                    src="https://mysominotes.files.wordpress.com/2017/07/powerpointlecture.jpg"
                    className="w-100"
                    alt="progress video"
                  />
                </div>
                <div className="d-inline">
                  <p
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                    className="mb-0"
                  >
                    Code Challenges: JavaScript
                  </p>
                  <p
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                    className="text-muted mb-0"
                  >
                    COURSE . 48 m 48 s left
                  </p>
                  <Line percent="10" strokeWidth="1" strokeColor="#0573B1" />
                </div>
              </div>
           
  </Tab>
  <Tab eventKey="contact" title="Contact" disabled>
    hello
  </Tab>
</Tabs>

            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Home;
