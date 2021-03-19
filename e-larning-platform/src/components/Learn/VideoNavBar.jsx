import React, { Component } from "react";
import {
    Navbar,Button
} from "react-bootstrap";
import {AiOutlineUnorderedList,AiOutlineLike,} from 'react-icons/ai';
import {RiShareForwardLine} from 'react-icons/ri';
import {BsBookmark} from 'react-icons/bs';

import "./Learn.css";

class VideoNavBar extends Component {
  state = {};

  render() {
    return (
      <>
        <Navbar id="videoNavbar" className="  py-1 " expand="lg">
          <Navbar.Brand className=" pr-1 sidebar-toggle-wrap">
            <Button className="sidebar-toggle-Button  " size="sm">
              {" "}
              <AiOutlineUnorderedList className="mr-2" />
              Contents
            </Button>
            {/* <p style={{color:"#aeaeaf",display:"inline", fontSize:"18px",fontWeight:"bold"}}>Contents</p> */}
          </Navbar.Brand>

          <div className="mr-auto ">
            <p style={{ fontWeight: "bold" }}>Course Name</p>
            <p style={{ color: "#aeaeaf" }}>Content Name</p>
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
export default  VideoNavBar;
