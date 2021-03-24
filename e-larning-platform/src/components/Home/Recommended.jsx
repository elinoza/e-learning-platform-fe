

import React, { Component } from "react";
import {

  Col,
  Container,

  Button,
  Carousel,

Card
} from "react-bootstrap";

import { BsPlay ,BsBookmark,BsBookmarkFill} from "react-icons/bs";
import { Avatar } from "@material-ui/core";
import "./home.css";
import {compose} from "redux";
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
        console.log("me endpoint", me);
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
    showDetail:false
  };

  handleHover=()=>{
    this.setState({showDetail:!this.state.showDetail})
  }

  saveCourse = async (courseId)=> {
    try {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/videos/save/"+courseId, {
        method: 'POST', 
        headers: {
          Authorization: "Bearer " + token,
          'Content-Type': 'application/json'
        },
      });
  
      
  
      if (response.ok) {
       this.props.fetchMewithThunk()
       
      } else {
     console.log("save error",response)
      }
  
      
    } catch (error) {
      console.log(error)
      
  }}

  unSaveCourse = async (courseId)=> {
    try {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/videos/unsave/"+courseId, {
        method: 'POST', 
        headers: {
          Authorization: "Bearer " + token,
          'Content-Type': 'application/json'
        },
      });
  
      
  
      if (response.ok) {
       this.props.fetchMewithThunk()
       
      } else {
     console.log("save error",response)
      }
  
      
    } catch (error) {
      console.log(error)
      
  }}
  



  render() {
    const {savedVideos}= this.props.me.me
    const {
      courseId,
    tutorName,
    tutorProfession,
    tutorImg,
    videoInfo,
    videoName,
    duration,
    createdAt,video_cover_img}=this.props
   
    return (
      
      <>

<Card className="recommendation-card" style={{ width: '18rem' }} 
onClick={()=>this.props.history.push(`/learn/${courseId}`)}
onMouseEnter={
      this.handleHover
     } onMouseLeave={
   this.handleHover
     }>
<Card.Img variant="top" src={video_cover_img } style={{ height: "13vw",
              objectFit: "cover"}} className="border"/>
<p
              style={{ fontSize: "12px", fontWeight: "bold"  }}
              className="text-muted mb-1 "
            >

             <BsPlay style={{fontSize:"16px"}}/>  COURSE 
            </p>
<Card.Body>

<Card.Text>
{videoName}
<p
              style={{ fontSize: "14px"}}
              className={this.state.showDetail === true ? "d-none text-muted mt-1 mb-0" :"d-block"} 
            >

            By: {tutorName}
            </p>
            <div className= {this.state.showDetail === true ? "d-block" :"d-none"} 
           
   >

            <p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className=" mb-0"
            >
              Intermediate .{duration} .{createdAt}
            </p>
            <div className="d-flex my-2">
      <Avatar
        src={tutorImg}
        className="navbar-logo m-0 mt-1 p-0 d-inline"
      />
      <div>
        {" "}
        <p
          style={{ fontSize: "12px" }}
          className="d-block ml-1 mb-0 p-0 "
        >{tutorName}
        </p>
        <p
          style={{ fontSize: "12px" }}
          className="d-block ml-1 mb-0 p-0 "
        >
          {tutorProfession}
        </p>
      </div>
    </div>

    <p
              style={{ fontSize: "12px"}}
              className="text-muted mt-1 mb-0"
            >

           {videoInfo}
            </p>
            <div className="d-flex">
            <p
              style={{ fontSize: "12px",fontWeight:"Bold"}}
              className="text-muted mt-2 mb-0"
            >

           1.787 Learners
            </p>

           {savedVideos && savedVideos.find( savedItem => savedItem._id===courseId)?
<Button className="SaveButton ml-auto"  onClick={()=>this.unSaveCourse(courseId)} size="sm"><BsBookmarkFill/>
Saved
</Button>: <Button className="SaveButton ml-auto"  onClick={()=>this.saveCourse(courseId)} size="sm"><BsBookmark/>
Save
</Button> }
            </div>

            </div>
           

</Card.Text>

</Card.Body>
</Card>


        
     
      </>
    );
  }
}
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Recommended);
