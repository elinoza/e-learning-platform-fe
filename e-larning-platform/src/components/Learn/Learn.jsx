import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Tabs,
  Navbar,Form,Button,NavDropdown,Nav,FormControl,
  Tab,
} from "react-bootstrap";

import Notes from "./Notes"
import Comments from "./Comments"
import OverView from "./overView"
import Videojs  from "./Video.js"
import videoNavbar from "./videoNavbar.js"
import {AiOutlineUnorderedList,AiOutlineLike,} from 'react-icons/ai';
import {RiShareForwardLine} from 'react-icons/ri';
import {BsBookmark} from 'react-icons/bs';
import "./Learn.css";




const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
 
  controls: true,
  responsive:true,
  preload:"metadata" ,
  
  // ,sources: [
  //   {
  //     src: 'https://res.cloudinary.com/elinoza/video/upload/v1615916859/413B3280-BC4B-4F40-B66D-12EE82275937_mv3bjq.mp4',
  //     type: 'video/mp4',
  //   },
  // ],
};



class Learn extends Component {
  state = {};


  render() {
    return (
      <>
      <Row>
        <Col  md={3}>
      <div class="sidebar">
      <a class="active" href="#home">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
    </Col>
  <Col md={9}  >
        <Row className="mx-0">
          <Col xs={12} className="player-col">
            <img src="https://annaabi.ee/thumb/a56708d3418b83a933dedea9d731fe26.jpg"/>
         
          {/* <Videojs {...videoJsOptions} /> */}
          <Navbar id="videoNavbar" className="  py-1 " expand="lg">
  <Navbar.Brand className=" pr-1 sidebar-toggle-wrap">
  <Button className="sidebar-toggle-Button  "  size="sm"> <AiOutlineUnorderedList  className="mr-2"/>
  Contents
</Button>
    {/* <p style={{color:"#aeaeaf",display:"inline", fontSize:"18px",fontWeight:"bold"}}>Contents</p> */}
  </Navbar.Brand>


  <div className="mr-auto ">
    <p style={{fontWeight:"bold"}}>Course Name</p>
    <p style={{color:"#aeaeaf"}}>Content Name</p>
  </div>
 
    <div className="ml-auto icons ">
    <AiOutlineLike className="icons mr-2 ml-2"/>
    474
   
    <BsBookmark  className="icons mr-2 ml-2"/>
    345
    <RiShareForwardLine   className="icons mr-2 ml-2"/>
    
    </div>
   

</Navbar>
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
        </Col>
        </Row>
      </>
    );
  }
}
export default Learn;
