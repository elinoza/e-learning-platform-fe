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
import Videojs  from "./Video.js"
import "./Learn.css";



const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
 
  controls: true,
  responsive:true,
  preload:"metadata" ,
  sources: [
    {
      src: 'https://res.cloudinary.com/elinoza/video/upload/v1615916859/413B3280-BC4B-4F40-B66D-12EE82275937_mv3bjq.mp4',
      type: 'video/mp4',
    },
  ],
};



class Learn extends Component {
  state = {};


  render() {
    return (
      <>
        <Row className="mx-0">
          <Col xs={12} className="player-col">
          <Videojs {...videoJsOptions} />
          </Col>
          <Col xs={12}>
            <div className="learn">
              <Container>
                <Tabs
                  defaultActiveKey="overview"
                  id="learn-tab"
                  className=" d-flex justify-content-center my-4"
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
