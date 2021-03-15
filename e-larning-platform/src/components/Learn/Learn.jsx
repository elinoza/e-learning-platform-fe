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


import overView from "./overView.jsx"


import { Avatar } from "@material-ui/core";

class Learn extends Component {
  state = {};

  render() {
    return (
      <>
        <Row>
          <Col xs={12} className="player-col">
            VIDEO PLAYER
          </Col>
          <Col xs={12}>
            <div className="learn">
              <Container>
                <Tabs
                  defaultActiveKey="overview"
                  id="learn-tab"
                  className="mt-2  d-flex justify-content-center mb-4"
                >
                  <Tab eventKey="overview" title="Overview">
                         <overView/>
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
export default Learn;
