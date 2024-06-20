import React, { Component } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { AiFillLinkedin } from "react-icons/ai";
// import downloadAppStore from "../assets/downloadAPPstore.png";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import logo from "../assets/Instagram-Logo.png";
import { FcGoogle } from "react-icons/fc";
import Footer from "../Footer/Footer";
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
    if (!urlParams.has("accessToken")) {
      if (Object.hasOwn(localStorage, "token")) {
        window.location.replace("/home");
      }
    } else {
      const token = urlParams.get("accessToken");
      localStorage.setItem("token", token);
      window.location.replace("/home");
    }
  };

  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  loginWithGoogle = async () => {
    const url = process.env.REACT_APP_URL;
    await fetch(url + "/users/googleLogin").then((response) => response.json());
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  login = async (e) => {
    e.preventDefault();
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
      localStorage.setItem("token", res.data);
      window.location.replace("/home");
    } else {
    }
  };
  render() {
    return (
      <div className="login-main">
        <div className="login-header">
          <AiFillLinkedin className="logo" /> L E A R N I N G
        </div>
        <Container>
          <div className="main-wrapper">
            <h4>Sign In</h4>
            <p>
              Sign in using the same email address you use for Linkedin.com or
              your organization email
            </p>

            <Form onSubmit={(e) => this.login(e)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="emailInput"
                  onChange={(e) => this.changeEmail(e)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => this.changePassword(e)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="signup-btn loginBtn mt-4"
              >
                Continue
              </Button>
            </Form>

            <Row className=" d-flex justify-content-center mt-4 googleLogin ">
              <FcGoogle className="blue mr-2 mt-1" />{" "}
              <a
                href={process.env.REACT_APP_URL + "/users/googleLogin"}
                className="login-link"
              >
                {" "}
                Sign In with Google
              </a>
            </Row>
            <Row className=" d-flex justify-content-center mt-4">
              <p className="" onClick={() => (window.location = "/register")}>
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
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Login;
