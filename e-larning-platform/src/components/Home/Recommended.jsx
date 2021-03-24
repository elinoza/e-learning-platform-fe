

import React, { Component } from "react";
import {

  Col,
  Container,

  Button,
  Carousel,

Card
} from "react-bootstrap";

import { BsPlay ,BsBookmark} from "react-icons/bs";

import { Avatar } from "@material-ui/core";



import "./home.css";

class Recommended extends Component {
  state = {
    showDetail:false,
    courses:[]
  };
  handleHover=()=>{
    this.setState({showDetail:!this.state.showDetail})
  }

componentDidMount=async()=>{
  const token = localStorage.getItem("token");
  const url = process.env.REACT_APP_URL;
  const response = await fetch(url + "/videos?category="+this.props.category, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const courses = await response.json();

  if (response.ok) {
   
    console.log("courses", courses);
    this.setState(courses)
  } else {
   
    console.log(response)
  }
}

  render() {
    const {courses}=this.state
    return (
      <>
     

<Card className="recommendation-card" style={{ width: '18rem' }} onMouseEnter={
      this.handleHover
     } onMouseLeave={
   this.handleHover
     }>
<Card.Img variant="top" src="https://mysominotes.files.wordpress.com/2017/07/powerpointlecture.jpg" className="border"/>
<p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className="text-muted mb-1 "
            >

             <BsPlay style={{fontSize:"16px"}}/>  COURSE 
            </p>
<Card.Body>

<Card.Text>
Code Challenges: JavaScript
<p
              style={{ fontSize: "14px"}}
              className={this.state.showDetail === true ? "d-none text-muted mt-1 mb-0" :"d-block"} 
            >

            By: Christina Gordon
            </p>
            <div className= {this.state.showDetail === true ? "d-block" :"d-none"} 
           
   >

            <p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className=" mb-0"
            >
              Intermediate . 48 m 48 s left .Dec/1 2020
            </p>
            <div className="d-flex my-2">
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/en/d/d7/Random_person_image.png"
        className="navbar-logo m-0 mt-1 p-0 d-inline"
      />
      <div>
        {" "}
        <p
          style={{ fontSize: "12px" }}
          className="d-block ml-1 mb-0 p-0 "
        >
          Dorie Clark
        </p>
        <p
          style={{ fontSize: "12px" }}
          className="d-block ml-1 mb-0 p-0 "
        >
          Professor of Something
        </p>
      </div>
    </div>

    <p
              style={{ fontSize: "12px"}}
              className="text-muted mt-1 mb-0"
            >

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magnam rem eveniet culpa enim a nostrum. Natus accusantium recusandae labore accusamus, voluptatum quas mollitia dolorem quos consectetur dolor est molestias.
            </p>
            <div className="d-flex">
            <p
              style={{ fontSize: "12px",fontWeight:"Bold"}}
              className="text-muted mt-2 mb-0"
            >

           1.787 Learners
            </p>

<Button className="SaveButton ml-auto"  size="sm"><BsBookmark/>
Save
</Button>
            </div>

            </div>
           

</Card.Text>

</Card.Body>
</Card>

        
     
      </>
    );
  }
}
export default Recommended;
