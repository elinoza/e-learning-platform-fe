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
  Card,
} from "react-bootstrap";
import "./Learn.css";
import { Avatar } from "@material-ui/core";

class Home extends Component {
  state = {};

  render() {
    return (
      <>
        <Row>
          <Col xs={12} className="player-col">
            VIDEO PLAYER
          </Col>
          <Col xs={12}>
            <div className="learn d-flex justify-content-center border-bottom">
              <Container>
                <Tabs
                  defaultActiveKey="overview"
                  id="learn-tab"
                  className="mt-2 "
                >
                  <Tab eventKey="overview" title="Overview">
                    <Row>
                      <Col>
                        <Row>
                          <Col xs={12} md={6} >  <p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className="text-muted mb-1 "
            >

             INSTRUCTOR
            </p> 
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
                <div
                      className="ml-auto d-inline w-75"
                      style={{ color: "#554AC2" }}
                    >
                      <a>View On Linkedin </a>
                      <a>Follow On Linkedin </a>
                    </div></Col>
                    <Col xs={12} md={6}>
                    <p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className="text-muted mb-1 "
            >

        RELATED TO THIS COURSE
            </p> 

            <p
                          style={{ fontWeight: "bold" }}
                          className="mb-0"
                        >
                          Code Challenges: JavaScript
                        </p>
                    </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="qa" title="QA ">
                    <Row></Row>
                  </Tab>
                  <Tab eventKey="notebook" title="Notebook">
                    <Row></Row>
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
export default Home;
