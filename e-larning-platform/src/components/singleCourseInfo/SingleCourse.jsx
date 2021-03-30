import React, { Component } from "react";
import { Col, Button, Dropdown, Card } from "react-bootstrap";
import { BsPlay, BsBookmark } from "react-icons/bs";
import { Line, Circle } from "rc-progress";
import { RiShareForwardLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import "../Home/home.css";
import "./SingleCourse.css";
import { connect } from "react-redux";
import { format, parseISO, formatDistance, intervalToDuration } from "date-fns";

const mapStateToProps = (state) => state;

class SingleCourse extends Component {
  state = {};

  formatSeconds = (seconds) => {
    let duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    let formatted = `${duration.hours}hr${duration.minutes}min `;
    return formatted;
  };

  render() {
    const {
      videoName,
      tutorName,
      tutorProfession,
      video_cover_img,
      updatedAt,
      remainingTime,
      createdAt,
      completePercentage,
      isProgressed,
      duration
    } = this.props;

    console.log("remaining Time", remainingTime);
    return (
      <>
        <Col xs={12}>
          <div
            className={
              this.props.style === "big"
                ? "d-flex big-single-course "
                : "d-flex single-course"
            }
          >
            <div
              className="d-inline  mr-2 w-25"
              // style={{ width: "98px", height: "55px" }}
            >
              <img
                className="d-block w-100 d-inline border mr-2 "
                src={video_cover_img}
                alt="progress video"
                style={{ height: "5vw",
                objectFit: "cover"}}
              />
            </div>
            <div className="d-inline  w-50">
              {this.props.style === "big" && (
                <p
                  style={{ fontSize: "12px", fontWeight: "bold" }}
                  className="text-muted mb-1 "
                >
                  <BsPlay style={{ fontSize: "16px" }} /> COURSE
                </p>
              )}
              <p style={{ fontWeight: "bold" }} className="mb-0">
                {videoName}
              </p>

              {console.log("style", this.props.style)}
              {/* {(() => {
                if (this.props.style === "small") {
                  if (isProgressed === "true") {
                    return <div>Progressed small</div>;
                  } else {
                    return <div>P
                      no progress small</div>;
                  }
                }  else {
                  return <div>myLearning</div>;
                }
              })()} */}




              {this.props.style === "small" ? (
                isProgressed === "true" ? (
                  <p
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                    className="text-muted mb-1 "
                  >
                    COURSE . {this.formatSeconds(remainingTime)} left
                  </p>
                ) : (
                  <p style={{ fontSize: "12px",fontWeight: "bold" }} className="text-muted mb-1 ">
                    By: {tutorName} . Released{" "}
                    {format(parseISO(createdAt), "MM/dd/yyyy")}
                  </p>
                )
              ) : (
                <p style={{ fontSize: "14px", marginBottom:"0px"}}>
                  By: {tutorName} . Released{" "}
                  {format(parseISO(createdAt), "MM/dd/yyyy")}
                </p>
              )}



              { isProgressed === "true" ? 
              
              this.props.completed === "false" ? (
                <Line
                  percent={completePercentage * 100}
                  strokeWidth="2.0"
                  strokeColor="#0573B1"
                  className="w-75"
                />
              ) : (
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#307B16",
                  }}
                  className=" ml-2 mb-0 d-inline"
                >
                  <AiFillCheckCircle /> Completed {updatedAt}
                </p>
              ): <p style={{ fontSize: "12px",fontWeight: "bold" }} className="text-muted mb-1 ">Duration . {this.formatSeconds(duration)}</p>}

              {this.props.style=== "big" && this.props.completed === "false" && (
                <p
                  style={{ fontSize: "14px" }}
                  className="text-muted ml-2 mb-0 d-inline"
                >
                  {remainingTime}
                </p>
              )}
            </div>




            
            {this.props.style === "big" && (
              <div
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
              </div>
            )}
          </div>
        </Col>
      </>
    );
  }
}
export default connect(mapStateToProps)(SingleCourse);
