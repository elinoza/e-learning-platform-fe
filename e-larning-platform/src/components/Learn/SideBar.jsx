import React, { Component } from "react";
import {
    Navbar,Button
} from "react-bootstrap";
import {AiOutlineUnorderedList,AiOutlineLike,} from 'react-icons/ai';
import {RiShareForwardLine} from 'react-icons/ri';
import {BsBookmark} from 'react-icons/bs';

import "./Learn.css";

class SideBar extends Component {
  state = {};

  render() {
    return (
      <>
        <div class="sidebar">
      <a class="active" >Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
        </div>
      </>
    );
  }
}
export default SideBar;
