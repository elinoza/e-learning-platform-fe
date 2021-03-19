import React, { Component } from "react";
import {
    Navbar,Button
} from "react-bootstrap";
import {AiOutlineUnorderedList,AiOutlineLike,} from 'react-icons/ai';
import {RiShareForwardLine} from 'react-icons/ri';
import {BsBookmark} from 'react-icons/bs';

import "./Learn.css";

class SideBar extends Component {
  state = {
    showSideBar:false
     
  };
  sideBarToggle=()=>{
    this.setState({showSideBar:true})
}
  render() {
    return (
      <>
        <div className= {"sidebar" + this.state.showSideBar ?   "showSideBar" : " closedSideBar" } >
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
