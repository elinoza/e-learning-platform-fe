import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Tabs,
  Tab,
} from "react-bootstrap";

import Notes from "./Notes"
import Comments from "./Comments"
import OverView from "./overView"
import "./Learn.css";







class Learn extends Component {
  state = {};

  render() {
    return (
      <>
        <Row className="mx-0">
          <Col xs={12} className="player-col">
            VIDEO PLAYER
          </Col>
          <Col xs={12}>
            <div className="learn">
              <Container>
                <Tabs
                  defaultActiveKey="overview"
                  id="learn-tab"
                  className="  py-5 d-flex justify-content-center my-4"
                >
                  <Tab eventKey="overview" title="Overview">
                   <OverView/>
                   </Tab>
                  <Tab eventKey="qa" title="QA ">
                 <Comments/>
                  </Tab>
                  <Tab eventKey="notebook" title="Notebook">
                  <Notes/>
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
