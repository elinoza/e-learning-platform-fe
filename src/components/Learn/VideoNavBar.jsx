import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import { AiOutlineUnorderedList, AiOutlineLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";

import "./Learn.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  sideBarToggle: (payload) =>
    dispatch({
      type: "SHOWSIDEBAR",
      payload: payload,
    }),
});
class VideoNavBar extends Component {
  state = {
    showSideBar: true,
  };

  render() {
    const { currentCourse, showSideBar, currentCourseProgress } =
      this.props.player;
    return (
      <>
        <Navbar id="videoNavbar" className="  py-1 " expand="lg">
          {!showSideBar && (
            <Navbar.Brand className=" pr-1 sidebar-toggle-wrap">
              <Button
                className="sidebar-toggle-Button  w-100 "
                size="sm"
                onClick={() => this.props.sideBarToggle(true)}
              >
                {" "}
                <AiOutlineUnorderedList className="mr-2" />
                {/* {currentCourseProgress&&currentCourseProgress._id!== undefined ? currentCourse.playList[currentCourseProgress.playlistIndex].contentName :currentCourse.playList[0].contentName } */}
              </Button>
              {/* <p style={{color:"#aeaeaf",display:"inline", fontSize:"18px",fontWeight:"bold"}}>Contents</p> */}
            </Navbar.Brand>
          )}

          <div className="mr-auto ">
            <p style={{ fontWeight: "bold" }}>{currentCourse.videoName}</p>
            {/* <p style={{ color: "#aeaeaf" }}>    {currentCourseProgress&&currentCourseProgress._id!== undefined ? currentCourse.playList[currentCourseProgress.playlistIndex].contentName :currentCourse.playList[0].contentName } </p> */}
          </div>

          <div className="ml-auto icons ">
            <AiOutlineLike className="icons mr-2 ml-2" />
            474
            <BsBookmark className="icons mr-2 ml-2" />
            345
            <RiShareForwardLine className="icons mr-2 ml-2" />
          </div>
        </Navbar>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoNavBar);
