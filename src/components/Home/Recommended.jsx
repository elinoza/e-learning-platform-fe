import React, { Component } from "react";

import { Col, Container, Button, Carousel, Card, Modal } from "react-bootstrap";
import { format, parseISO, formatDistance, intervalToDuration } from "date-fns";
import { BsPlay, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Avatar } from "@material-ui/core";
import "./home.css";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  fetchMewithThunk: () =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const me = await response.json();
      if (response.ok) {
        dispatch({
          type: "SET_ME",
          payload: me,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: me,
        });
      }
    }),
});

class Recommended extends Component {
  state = {
    showDetail: false,
  };

  formatSeconds = (seconds) => {
    let duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    let formatted = `${duration.hours}hr  ${duration.minutes}min `;
    return formatted;
  };

  handleHover = () => {
    this.setState({ showDetail: !this.state.showDetail });
  };

  saveCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/videos/save/" + courseId, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        this.props.fetchMewithThunk();
      } else {
      }
    } catch (error) {}
  };

  unSaveCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/videos/unsave/" + courseId, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        this.props.fetchMewithThunk();
      } else {
      }
    } catch (error) {}
  };

  render() {
    const { savedVideos } = this.props.me.me;
    const {
      courseId,
      tutorName,
      tutorProfession,
      tutorImg,
      videoInfo,
      videoName,
      duration,
      createdAt,
      video_thumbnail_img,
      learners,
    } = this.props;
    return (
      <>
        <Col md={4} lg={3} lgclassName="rec-col ">
          <Card className="recommendation-card  position-relative ">
            <Card.Img
              onClick={() => this.props.history.push(`/learn/${courseId}`)}
              variant="top"
              src={video_thumbnail_img}
              style={{
                height: "auto",
                minHeight: "10rem",
                objectFit: "contain",
              }}
              className="border"
            />
            <p
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
              className="text-muted mb-1 "
            >
              <BsPlay style={{ fontSize: "16px" }} /> COURSE
            </p>

            <Card.Body>
              <Card.Text style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <p className="  mb-0">{videoName}</p>
                <p
                  style={{ fontSize: "14px" }}
                  className=" text-muted mt-1 mb-0"
                >
                  By: {tutorName}
                </p>
              </Card.Text>
            </Card.Body>
            <div className="infos-container  shadow">
              <div className="infos-content">
                <p style={{ fontSize: "12px" }} className=" mb-0">
                  Intermediate . {this.formatSeconds(duration)} .{" "}
                  {format(parseISO(createdAt), "MM/dd/yyyy")}
                </p>
                <div className="d-flex my-2">
                  <Avatar
                    src={tutorImg}
                    className="navbar-logo m-0 mt-1 p-0 d-inline"
                  />
                  <div style={{ marginTop: "5px" }}>
                    {" "}
                    <p
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                      className="d-block ml-1 mb-0 p-0  "
                    >
                      {tutorName}
                    </p>
                    <p
                      style={{ fontSize: "11px" }}
                      className="d-block ml-1 mb-0 p-0 "
                    >
                      {tutorProfession}
                    </p>
                  </div>
                </div>

                <p
                  style={{ fontSize: "12px" }}
                  className="text-muted mt-1 mb-0 text-truncate"
                >
                  {videoInfo}
                </p>
                <div className="d-flex">
                  <p
                    style={{ fontSize: "12px", fontWeight: "Bold" }}
                    className="text-muted mt-2 mb-0"
                  >
                    {learners} Learners
                  </p>

                  {savedVideos &&
                  savedVideos.find(
                    (savedItem) => savedItem._id === courseId
                  ) ? (
                    <Button
                      className="SaveButton ml-auto"
                      onClick={() => this.unSaveCourse(courseId)}
                      size="sm"
                    >
                      <BsBookmarkFill />
                      Saved
                    </Button>
                  ) : (
                    <Button
                      className="SaveButton ml-auto"
                      onClick={() => this.saveCourse(courseId)}
                      size="sm"
                    >
                      <BsBookmark />
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </>
    );
  }
}
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Recommended);
