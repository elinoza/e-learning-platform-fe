import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./Learn.css";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GoFileDirectory } from "react-icons/go";
import { BiCertification } from "react-icons/bi";
import SingleCourse from "../singleCourseInfo/SingleCourse";
import { format, parseISO, formatDistance, intervalToDuration } from "date-fns";
import { Avatar } from "@material-ui/core";

class overView extends Component {
  state = {};

  formatSeconds = (seconds) => {
    let duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    let formatted = `${duration.hours}hr ${duration.minutes}min ${duration.seconds}sec`;
    return formatted;
  };

  render() {
    const { currentCourse } = this.props;
    return (
      <>
        {currentCourse && currentCourse._id !== undefined && (
          <Row>
            <Col xs={12} md={8} className="border-right mb-5">
              <Row>
                <Col xs={12} md={6} className="border-right ">
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
                        className="d-block  mb-0 p-0 "
                      >
                        {currentCourse.tutor.tutorName}
                      </p>
                      <p
                        style={{ fontSize: "14px" }}
                        className="d-block  mb-0 p-0 "
                      >
                        {currentCourse.tutor.tutorProfession}
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
                <Col xs={12} md={6}>
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
                      <HiOutlineUserGroup className="icons notWhiteIcons" />
                      <p>Learning Groups .</p>
                      <p className="ml-2 d-inline showAll-tags ">
                        <a>Show All </a>
                      </p>{" "}
                    </li>
                    <li>
                      <GoFileDirectory className="icons notWhiteIcons" />
                      <p>Exercise Files .</p>
                      <p className="ml-2 d-inline  showAll-tags">
                        <a>Show All </a>
                      </p>
                    </li>
                    <li>
                      <BiCertification className="icons notWhiteIcons" />
                      <p>Certificates .</p>
                      <p className="ml-2 d-inline  showAll-tags">
                        <a>Show All </a>
                      </p>
                    </li>
                  </ul>
                </Col>
              </Row>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Course Details
              </h3>
              <p
                style={{ fontSize: "14px", fontWeight: "bold" }}
                className="text-muted mb-1 mt-4 "
              >
                {this.formatSeconds(currentCourse.duration)} . Intermediate .
                Released:
                {format(parseISO(currentCourse.createdAt), "MM/dd/yyyy")}
              </p>
              <p>{currentCourse.videoInfo}</p>
              <h3
                style={{
                  marginBottom: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Skills Covered
              </h3>

              <div className="skillset-wrap">
                {currentCourse.skills &&
                  currentCourse.skills.map((skill) => (
                    <p className="d-inline  skillset-tags mt-3 ">
                      <a className="m-0">{skill} </a>
                    </p>
                  ))}
              </div>
            </Col>
            <Col xs={12} md={4}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Related Courses
              </h3>
              {/* <Row><SingleCourse completed="false" /></Row> */}
            </Col>
          </Row>
        )}
      </>
    );
  }
}
export default overView;
