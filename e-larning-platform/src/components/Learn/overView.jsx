import React, { Component } from "react";
import {
  Row,
  Col,
  Button

} from "react-bootstrap";
import "./Learn.css";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GoFileDirectory } from "react-icons/go";
import { BiCertification } from "react-icons/bi";
import SingleCourse from "../singleCourseInfo/SingleCourse"


import { Avatar } from "@material-ui/core";

class overView extends Component {
  state = {};

  render() {
    return (
      <>

                    <Row>
                      <Col xs={12} md={8} className="border-right">
                        <Row>
                          <Col xs={12} md={6} className="border-right">
                            {" "}
                            <p
                              style={{ fontSize: "14px", fontWeight: "bold" }}
                              className="text-muted mb-3 "
                            >
                              INSTRUCTOR
                            </p>
                            <div className="d-flex instructor">
                              <Avatar
                                src="https://upload.wikimedia.org/wikipedia/en/d/d7/Random_person_image.png"
                                className="navbar-logo m-0 mt-1  mr-4 p-0 d-inline"
                              />
                              <div>
                                {" "}
                                <p
                                  style={{
                                    fontSize: "16px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                  }}
                                  className="d-block ml-1 mb-0 p-0 "
                                >
                                  Dorie Clark
                                </p>
                                <p
                                  style={{ fontSize: "14px" }}
                                  className="d-block ml-1 mb-0 p-0 "
                                >
                                  Professor of Something
                                </p>
                                <p className="d-inline showAll-tags ">
                                  <a
                                    style={{
                                      marginRight: "5px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    View on Linkedin{" "}
                                  </a>

                                  <a
                                    style={{
                                      marginRight: "5px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    Follow on Linkedin{" "}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} md={6} >
                            <p
                              style={{ fontSize: "14px", fontWeight: "bold" }}
                              className="text-muted mb-3 "
                            >
                              RELATED TO THIS COURSE
                            </p>

                            <p style={{ fontWeight: "bold" }} className="mb-0">
                              Code Challenges: JavaScript
                            </p>
                            <ul className="p-0 related-to-course">
                              <li>
                                <HiOutlineUserGroup className="icons" />{" "}
                                <p>Learning Groups .</p>
                                <p className="ml-2 d-inline showAll-tags ">
                                  <a>Show All </a>
                                </p>{" "}
                              </li>
                              <li>
                                <GoFileDirectory className="icons" />
                                <p>Exercise Files .</p>
                                <p className="ml-2 d-inline  showAll-tags">
                                  <a>Show All </a>
                                </p>
                              </li>
                              <li>
                                <BiCertification className="icons" />
                                <p>Certificates .</p>
                                <p className="ml-2 d-inline  showAll-tags">
                                  <a>Show All </a>
                                </p>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                        <h3  style={{
                                     fontSize:"20px",
                                      fontWeight: "bold",
                                    }}>Course Details</h3>
                        <p
              style={{ fontSize: "14px", fontWeight: "bold" }}
              className="text-muted mb-1 mt-4 "
            >

              52m . Intermediate . Released:6/20/2018 
            </p> 
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit quod dolorem ab incidunt nihil voluptas non fugit, asperiores animi qui error minus debitis ea! Nemo quasi pariatur eius. Nesciunt, corrupti.
            </p>
            <h3  style={{marginBottom:"30px",
                                     fontSize:"20px",
                                      fontWeight: "bold",
                                    }}>Skills Covered</h3>
                                    <p className="d-inline  skillset-tags mt-3 ">
                                  <a
                                  
                                  >
                                    Front-end Development{" "}
                                  </a>

					

                                  <a
                                   
                                  >
                                    {" "}
                                    Javascript{" "}
                                  </a>
                                  </p>
                                  
                     
                      </Col>
                    <Col  xs={12} md={4}>
                    <h3  style={{
                                     fontSize:"20px",
                                      fontWeight: "bold",

                                    }}>Related Courses</h3>
                        <Row><SingleCourse completed="false" /></Row>
                                    

                    </Col></Row>
         
      </>
    );
  }
}
export default overView;
