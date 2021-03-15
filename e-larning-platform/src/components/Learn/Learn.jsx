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
import "./Learn.css";








class Home extends Component {
  state = {

  };




  render() {
    return (
      <>

      
     
        <Row>
            <Col xs={12} className="player-col">VIDEO PLAYER</Col>
            <Col xs={12}>
               
                <div className="learn d-flex justify-content-center border-bottom"> 
                <Container>
          <Tabs
            defaultActiveKey="overview"
            id="learn-tab"
            className="mt-2 "
          >
            <Tab eventKey="overview" title="Overview">
              <Row >
               
       <Col></Col>
              
          
              </Row>
            </Tab>
            <Tab eventKey="qa" title="QA ">
            <Row>
               
           
             
         
             </Row>
            </Tab>
            <Tab eventKey="notebook" title="Notebook">
            <Row>
               
              
             
         
             </Row>
                </Tab>
                <Tab eventKey="transcript" title="Trancript ">
                <Row>
               
               
              
          
              </Row>
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
