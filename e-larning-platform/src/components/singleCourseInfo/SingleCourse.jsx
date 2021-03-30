import React, { Component } from "react";
import {
  Col,
  Button,
  Dropdown,
Card
} from "react-bootstrap";
import { BsPlay ,BsBookmark} from "react-icons/bs";
import { Line, Circle } from "rc-progress";
import { RiShareForwardLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import "../Home/home.css";
import "./SingleCourse.css";
import { connect } from "react-redux";
import { format,parseISO,formatDistance,intervalToDuration } from 'date-fns'

const mapStateToProps = (state) => state;

class SingleCourse extends Component {
  state = {

  };


formatSeconds=(seconds)=>{

 
let duration = intervalToDuration({ start: 0, end: seconds * 1000 })
let formatted = `${duration.hours}hr${duration.minutes}min `
return formatted
}

  render() {
    const{videoName,tutorName,tutorProfession,video_cover_img,updatedAt,remainingTime,createdAt,completePercentage, isProgressed}=this.props
    
   console.log("remaining Time",remainingTime)
    return (
      <>


<Col xs={12}>
   <div className={this.props.style ?"d-flex big-single-course ": "d-flex single-course"}>
                      <div
                        className="d-inline  mr-2 w-25"
                        // style={{ width: "98px", height: "55px" }}
                      >
                        <img
                          className="d-block w-100 d-inline border mr-2 "
                          src="https://mysominotes.files.wordpress.com/2017/07/powerpointlecture.jpg"
                         
                          alt="progress video"
                        />
                       
                      </div>
                      <div className="d-inline  w-50">
                      {this.props.style &&  <p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className="text-muted mb-1 "
            >

             <BsPlay style={{fontSize:"16px"}}/>  COURSE 
            </p> }
                        <p
                          style={{ fontWeight: "bold" }}
                          className="mb-0"
                        >
                          {videoName}
                        </p>




                        {!this.props.style &&

isProgressed ? 
                        <p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className="text-muted mb-1 "
            >

               COURSE . {isProgressed} left
            </p> :   <p  style={{ fontSize:"12px" }}
                         >

                    By: {tutorName} . Released { format(parseISO(createdAt),'MM/dd/yyyy')}
                        </p>  }

            {this.props.style && 
                        <p  style={{ fontSize:"14px" }}
                         >

                    By: {tutorName} . Released { format(parseISO(createdAt),'MM/dd/yyyy')}
                        </p> }
                        {this.props.completed === "false" ?
                        <Line
                          percent={completePercentage*100}
                          strokeWidth="2.0"
                          strokeColor="#0573B1"
                          className="w-75"
                        />: <p
                        style={{  fontSize:"14px" ,fontWeight:"bold", color:"#307B16"}}
                        className=" ml-2 mb-0 d-inline"
                      >
                      <AiFillCheckCircle/> Completed {updatedAt}
                      </p> }

                           {this.props.style &&  this.props.completed === "false" && <p
                          style={{  fontSize:"14px" }}
                          className="text-muted ml-2 mb-0 d-inline"
                        >
                        {remainingTime}
                        </p>}
                      </div>
                      {this.props.style &&  <div
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
                </div> }
                    </div>
              
     </Col>
 
      </>
    );
  }
}
export default connect(mapStateToProps)(SingleCourse);
