import React, { Component } from "react";

import Carousel from "react-elastic-carousel";
import Recommended from "./Recommended";
import { Row } from "react-bootstrap";
import "./home.css";

class MultiCarousel extends Component {
  state = {
    courses: [],
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    const url = process.env.REACT_APP_URL;
    const response = await fetch(
      url + "/videos?category=" + this.props.category,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const courses = await response.json();

    if (response.ok) {
      this.setState({ courses });
    } else {
    }
  };

  render() {
    const { courses } = this.state;

    return (
      <>
        <h6>{this.props.title} </h6>
        <Row className="multiple-carousel mb-5 mt-3">
          {courses &&
            courses.map((item) => (
              <Recommended
                courseId={item._id}
                tutorName={item.tutor.tutorName}
                tutorProfession={item.tutor.tutorProfession}
                videoName={item.videoName}
                createdAt={item.createdAt}
                duration={item.duration}
                tutorImg={item.tutor.tutorImg}
                videoInfo={item.videoInfo}
                learners={item.myProgress.length}
                video_thumbnail_img={item.video_thumbnail_img}
              />
            ))}
        </Row>
      </>
    );
  }
}
export default MultiCarousel;
