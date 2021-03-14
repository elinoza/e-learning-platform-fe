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
import { BsPlay ,BsBookmark} from "react-icons/bs";
import { Line, Circle } from "rc-progress";
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
                        className="d-inline border mr-2 w-25"
                        // style={{ width: "98px", height: "55px" }}
                      >
                        <img
                          className="d-block w-100 d-inline border mr-2 "
                          src="https://mysominotes.files.wordpress.com/2017/07/powerpointlecture.jpg"
                         
                          alt="progress video"
                        />
                       
                      </div>
                      <div className="d-inline  w-75">
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
                     
                        <p  style={{ fontSize:"14px" }}
                         >

                    By: Christina Gordon . Released 14 Dec,2020
                        </p>
                        <Line
                          percent="10"
                          strokeWidth="1.5"
                          strokeColor="#0573B1"
                          className="w-25"
                        />
                           {this.props.style && <p
                          style={{  fontSize:"14px" }}
                          className="text-muted ml-2 mb-0 d-inline"
                        >
                         48 m 48 s left
                        </p>}
                      </div>
                    </div>
     </Col>
      </>
    );
  }
}
export default SingleCourse;
