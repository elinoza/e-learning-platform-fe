import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AiFillLinkedin} from 'react-icons/ai';
import Footer from "../Footer/Footer"
// import logo from "./instagram.png";
import {FcGoogle  } from "react-icons/fc";
import "./login.css";
// import downloadAppStore from "../assets/downloadAPPstore.png";
class Register extends Component {
  state = {
    email: "",
    password: "",
    token: "",
    refreshToken: "",
    fullname:"",
    username:""
  };

  
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changeUserName = (e) => {
    this.setState({ username: e.target.value });
  };
  changeFullName = (e) => {
    this.setState({ fullname: e.target.value });
  };
  addTokens = (data) => {
    this.setState({ token: data.token });
    this.setState({ token: data.refreshToken });
  };
  register = async () => {
    try{  this.setState({ loading: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName:this.state.fullname,
        userName:this.state.username,
        password: this.state.password,
        email: this.state.email,
      }),
    };
    const url=process.env.REACT_APP_URL

    
    let response= await fetch(url + "/users/register", requestOptions)
    if (response.ok){window.location.replace("/")}
    else{console.log(response)}}
    catch(e){console.log(e)}
  
      
  };
  render() {
    return (
      <>
      <div className="login-header mt-4 p-4"> 
  <AiFillLinkedin className="logo "/> L E A R N I N G 
  <h1>A very personalized learning experience!</h1>
  </div>

  <Container>
  <Form onSubmit={this.register}>
  <Form.Group controlId="formBasicfullName">
    <Form.Label className="form-label">Full Name</Form.Label>
    <Form.Control type="text" placeholder="Enter fullname"  onChange={(e) => this.changeFullName(e)}/>
    
  </Form.Group>

  <Form.Group controlId="formBasicuserName">
    <Form.Label className="form-label">User Name</Form.Label>
    <Form.Control type="userName" placeholder="Enter your user name"  onChange={(e) => this.changeUserName(e)}/>
    
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="form-label">Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.changeEmail(e)}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label className="form-label">Password</Form.Label>
    <Form.Control type="password" placeholder="Password"  onChange={(e) => this.changePassword(e)} />
  </Form.Group>
  <Form.Label className="form-label">By clicking Agree & Join, you agree to the <a className="terms-tag">LinkedIn User Agreement</a>, <a className="terms-tag">Privacy Policy</a>, and <a className="terms-tag">Cookie Policy</a>.{" "}</Form.Label>
  
  <Button variant="primary" type="submit" className="signup-btn mt-4">
    Agree & Join
  </Button>
</Form>
<Button variant="primary" type="submit" className="google-btn mt-4">
<FcGoogle className="mr-1 mb-1" />
   <a href = {process.env.REACT_APP_URL +"/users/googleLogin"} > Log In with Google</a>
  </Button>
  <div className=" d-flex justify-content-center mt-4">
                <p className="registrationText"> Already on Linkedin?</p>
                <a
                  className="blue ml-2"
                  onClick={() => (window.location = "/")}
                >
                  Sign In
                </a>
     </div>
     
  </Container>
  <Footer/>
       
      </>
    );
  }
}
export default Register;
