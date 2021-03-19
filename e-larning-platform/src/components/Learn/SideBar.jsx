import React, { Component } from "react";
import {
    Navbar,Button,Form,
} from "react-bootstrap";
import {AiOutlineUnorderedList} from 'react-icons/ai';
import {IoMdRadioButtonOff} from 'react-icons/io';
import {FcCheckmark} from 'react-icons/fc';
import {BsBookmark } from 'react-icons/bs';

import "./Learn.css";

class SideBar extends Component {
  state = {
    showSideBar:true,
    isCompleted:false
     
  };
  sideBarToggle=()=>{
    this.setState({showSideBar:true})
}

  render() {
    return (
      <>
        <div className= { this.state.showSideBar ?   "sidebar showSideBar" : " sidebar closedSideBar" } >
        <a className="closebtn" onClick={()=>this.setState({showSideBar:false})}>×</a>
        <div className="sidebar-toggle-wrapper "><Button className="sidebar-toggle-Button  pt-3 w-100 d-flex align-items-start"  onClick={()=>this.setState({showSideBar:false})} size="sm">
              {" "}
              <AiOutlineUnorderedList className="mr-2 mt-1" />
              Contents
            </Button></div>
        
          
            <ul className="m-0 p-0">
            <li className="d-flex">
            {!this.state.isCompleted ? <IoMdRadioButtonOff className="icons mr-2 mt-3"/>: <FcCheckmark className="icons mr-2 mt-3"/>} 
            <div><p className="m-0">Introduction</p>
            <p className="m-0" style={{color:"#b7b0b0", fontSize:"14px"}}> 3m 13 s</p>
            </div>  <BsBookmark style={{fontSize:"20px"}} className="icons  ml-auto mt-2" />
          
              </li>
         
            </ul>
        </div>
      </>
    );
  }
}
export default SideBar;
