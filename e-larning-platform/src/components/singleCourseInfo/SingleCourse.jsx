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
  Dropdown,
Card
} from "react-bootstrap";
import { BsPlay ,BsBookmark} from "react-icons/bs";
import { Line, Circle } from "rc-progress";
import { RiShareForwardLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import "../Home/home.css";
import "./SingleCourse.css";



class SingleCourse extends Component {
  state = {

  };




  render() {
    return (
      <>
<Col xs={12}>
   <div className={this.props.style ?"d-flex big-single-course ": "d-flex single-course"}>
                      <div
                        className="d-inline  mr-2 w-25"
                        // style={{ width: "98px", height: "55px" }}
                      >
                        <img
                          className="d-block w-100 d-inline border mr-2 "
                          src="https://mysominotes.files.wordpress.com/2017/07/powerpointlecture.jpg"
                         
                          alt="progress video"
                        />
                       
                      </div>
                      <div className="d-inline  w-50">
                      {this.props.style &&  <p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className="text-muted mb-1 "
            >

             <BsPlay style={{fontSize:"16px"}}/>  COURSE 
            </p> }
                        <p
                          style={{ fontWeight: "bold" }}
                          className="mb-0"
                        >
                          Code Challenges: JavaScript
                        </p>

                        {!this.props.style &&  
                        <p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className="text-muted mb-1 "
            >

               COURSE . 48 m 48 s left
            </p>  }

            {this.props.style && 
                        <p  style={{ fontSize:"14px" }}
                         >

                    By: Christina Gordon . Released 14 Dec,2020
                        </p> }
                        {this.props.completed === "false" ?
                        <Line
                          percent="10"
                          strokeWidth="2.0"
                          strokeColor="#0573B1"
                          className="w-50"
                        />: <p
                        style={{  fontSize:"14px" ,fontWeight:"bold", color:"#307B16"}}
                        className=" ml-2 mb-0 d-inline"
                      >
                      <AiFillCheckCircle/> Completed 3/14/2021
                      </p> }

                           {this.props.style &&  this.props.completed === "false" && <p
                          style={{  fontSize:"14px" }}
                          className="text-muted ml-2 mb-0 d-inline"
                        >
                         48 m 48 s left
                        </p>}
                      </div>
                      {this.props.style &&  <div
                  className="ml-auto d-inline mt-5"
                  style={{ color: "#0973B1 ", fontWeight: "bold" }}
                >
                  <Button className="SaveButton ml-auto " size="sm">
                    <RiShareForwardLine />
                    Share
                  </Button>
                  |
                  <Dropdown className="me d-inline mb-1 ">
                    <Dropdown.Toggle className="Profile-menu ">
                      More
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right" />
                  </Dropdown>
                </div> }
                    </div>
              
     </Col>
 
      </>
    );
  }
}
export default SingleCourse;
