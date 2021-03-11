import React, { Component } from "react";
import { Row, Col, Container,Form } from "react-bootstrap";
import { AiFillLinkedin} from 'react-icons/ai';
// import downloadAppStore from "../assets/downloadAPPstore.png";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import logo from "../assets/Instagram-Logo.png";
import {FcGoogle as GrFacebook } from "react-icons/fc";
import Footer from "./Footer"
import "./login.css";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    token: "",
    refreshToken: "",
  };

  componentDidMount = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get("accessToken"));
    if (!urlParams.has("accessToken")) {
    } else {
      const token = urlParams.get("accessToken");
      console.log(token);
      localStorage.setItem("token", token);
      window.location.replace("/feed");
    }
  };

  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  loginWithGoogle = async () => {
    const url = process.env.REACT_APP_URL;
    await fetch(url + "/users/googleLogin")
      .then((response) => response.json())
      .then((data) => console.log("response of oauth", data));
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  // addTokens = (data) => {
  //   this.setState({ token: data.accessToken });
  //   this.setState({ refreshToken: data.refreshToken });
  // };
  login = async () => {
    const url = process.env.REACT_APP_URL;
    this.setState({ loading: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        password: this.state.password,
        email: this.state.email,
      },
    };
    const res = await axios(url + "/users/login", requestOptions);

    if (res.status === 200) {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      window.location.replace("/feed");
      console.log("res", res);
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
  
  <div className="login-header"> 
  <AiFillLinkedin className="logo"/> L E A R N I N G 
 
  </div>
  <Container>
  <h4>Sign In</h4>
  <p>Sign in using the same email address you use for Linkedin.com or your organization email</p>
  <Form onSubmit= {this.login}>
  <Form.Row className=" d-flex justify-content-center mb-2">
                <input
                  autocomplete="off"
                  type="email"
                  className="emailInput"
                  placeholder="email"
                  onChange={(e) => this.changeEmail(e)}
                ></input>
              </Form.Row>
              <Form.Row className=" d-flex justify-content-center mb-4">
                <input
                  autocomplete="off"
                  type="password"
                  className="passwordInput"
                  placeholder="password"
                  onChange={(e) => this.changePassword(e)}
                ></input>
               
              </Form.Row>
                <button className="loginBtn" type="submit">
                  Continue 
                </button>
    </Form>

    <Row className=" d-flex justify-content-center mt-4 googleLogin">
                <GrFacebook className="blue mr-2 mt-1" />{" "}
                <a
                  href={process.env.REACT_APP_URL + "/users/googleLogin"}
                  className="login-link"
                >
                  {" "}
                  Sign In with Google
                </a>
              </Row>
              <Row className=" d-flex justify-content-center mt-4">
                <p
                  className=""
                  onClick={() => (window.location = "/register")}
                >
                  {" "}
                  New to Linkedin?
                </p>
                <a
                  className="blue ml-2 login-link"
                  onClick={() => (window.location = "/register")}
                >
                  Join Now
                </a>
              </Row>
              
              <Footer/>
  </Container>
        </>
    );
  }
}
export default Login;
