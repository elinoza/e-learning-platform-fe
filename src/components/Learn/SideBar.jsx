import React, { Component } from "react";
import {
    Navbar,Button,Form,
} from "react-bootstrap";
import {AiOutlineUnorderedList} from 'react-icons/ai';
import {IoMdRadioButtonOff} from 'react-icons/io';
import {FcCheckmark} from 'react-icons/fc';
import {BsBookmark } from 'react-icons/bs';
import { format, parseISO, formatDistance, intervalToDuration } from "date-fns";
import "./Learn.css";
import { connect } from "react-redux";


const mapStateToProps = (state) => state;


const mapDispatchToProps = (dispatch) => ({


  sideBarToggle: (payload) =>
  dispatch({
    type: "SHOWSIDEBAR",
    payload:payload,
  })
 
});

class SideBar extends Component {
  state = {
  
    isCompleted:false
     
  };
  formatSeconds = (seconds) => {
    let duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    let formatted = `${duration.minutes}min ${duration.seconds}sec `;
    return formatted;
  };

//   sideBarToggle=()=>{
//     this.setState({showSideBar:true})
// }
completed=(array,index)=>{
  let completed
  if(array){  completed= this.props.player.currentCourseProgress && array.find(item => item.index===index) }
  else{completed=false}
 
 
  return completed
}

triggerParentComponentforRedux = () => {
  this.props.triggerParentComponentforRedux(true);
};

postProgress = async (courseId, currentIndex) => {
  let data;

    data = {
      playlistIndex: currentIndex,
      totalWatch:0

    };


  try {
    const token = localStorage.getItem("token");
    const url = process.env.REACT_APP_URL;
    const response = await fetch(url + "/users/myLearning/" + courseId, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("progress saved to server from sidebar");
      this.triggerParentComponentforRedux();
    } else {
      console.log("save error", response);
    }
  } catch (error) {
    console.log(error);
  }
};


componentDidMount=()=>{
  this.props.sideBarToggle(true)

}
  render() {
    const { currentCourse, currentCourseProgress,showSideBar} = this.props.player;
    const activeIndex=currentCourseProgress.playlistIndex
    console.log("sidebar showSidebar",this.props.player)
    return (
      <>
        <div className= { showSideBar ?   "sidebar showSideBar" : " sidebar closedSideBar" } >
        <a className="closebtn" onClick={()=>this.props.sideBarToggle(false)}>×</a>
        <div className="sidebar-toggle-wrapper "><Button className="sidebar-toggle-Button  pt-3 w-100 d-flex align-items-start"  onClick={()=>this.props.sideBarToggle(false)} size="sm">
              {" "}
              <AiOutlineUnorderedList className="mr-2 mt-1" />
              Contents
            </Button></div>
        
          
            <ul className="m-0 p-0">

{ currentCourse.playList && currentCourse.playList.map((item,index)=>


       

            <li className={ activeIndex === index ? "activeContent d-flex": "d-flex" }  onClick={()=>this.postProgress(currentCourse._id,index)}>
            
            { !this.completed(currentCourseProgress.completed,index)? <IoMdRadioButtonOff className="icons mr-2 mt-3"/>: <FcCheckmark className="icons mr-2 mt-3"/>} 
            <div><p className="m-0">{item.contentName}</p>
            <p className="m-0" style={{color:"#b7b0b0", fontSize:"14px"}}> {this.formatSeconds(item.duration)}</p>
            </div> <BsBookmark style={{fontSize:"20px"}} className="icons  ml-auto mt-2" />
           </li>

            )  }
         
            </ul>
        </div>
      </>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SideBar);
