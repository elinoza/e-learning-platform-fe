import React, { useCallback, useEffect, useState } from "react";
import "./NavBar.css";
import {
  Navbar,
  Form,
  Nav,
  Button,
  FormControl,
  Dropdown,
  Container,
} from "react-bootstrap";
import { Avatar, Badge } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import {
  AiOutlineUnorderedList,
  AiOutlineSearch,
  AiFillLinkedin,
} from "react-icons/ai";
import { BiBookOpen, BiWorld } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <Navbar expand="lg" className="shadow ">
      <Container className="d-flex">
        <Link to="/home">
          {" "}
          <Navbar.Brand href="#home">
            <div className="navbar-icon">
              <AiFillLinkedin className="logo" /> L E A R N I N G
            </div>
          </Navbar.Brand>
        </Link>
      

        <Nav.Link href="#home">
          <AiOutlineUnorderedList className="navbar-logo" />
          <p className="m-0">Browse</p>
        </Nav.Link>

        <Form inline className="search-wrap">
          <AiOutlineSearch className="d-inline navbar-logo mx-1" />
          <FormControl
            type="text"
            placeholder="Search"
            style={{ fontSize: "12px" }}
            className="p-0 m-0 search d-inline"
          />
        </Form>
        <Navbar.Toggle className="navbar-toggle ml-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="ml-auto  ">
          <Link to="/home" className="mr-3">
            <IoHomeOutline className="navbar-logo" />
            <p className="m-0">Home</p>
          </Link>

          <Link to="/me" className="mr-3">
            <BiBookOpen className="navbar-logo" />
            <p className="m-0">My Learning</p>{" "}
          </Link>

          <Link to="/languages" className="mr-4">
            <BiWorld className="navbar-logo" />
            <p className="m-0">En</p>
          </Link>

          <Dropdown className="me ">
            <Dropdown.Toggle className="profile-menu">
              <Avatar
                src="data:image/jpeg;base64,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"
                className="navbar-logo m-0 p-0"
              />
              <p style={{ fontSize: "12px" }} className="m-0">
                Me
              </p>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-right">
              <a
                onClick={handleLogout}
                className="pl-2 log-out"
                style={{ fontSize: "12px", color: "black", fontWeight: "bold" }}
              >
                Log out{" "}
              </a>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(NavBar);
