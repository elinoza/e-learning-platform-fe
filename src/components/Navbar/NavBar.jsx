import React, { useCallback, useEffect, useState } from "react"
import "./NavBar.css";
import {Navbar,Form ,Nav,Button,FormControl,Dropdown,Container
  
  } from "react-bootstrap";
  import {Avatar, Badge} from '@material-ui/core';
  import { withRouter } from "react-router-dom";
  import {AiOutlineUnorderedList,AiOutlineSearch,AiFillLinkedin} from 'react-icons/ai';
  import { BiBookOpen,BiWorld} from 'react-icons/bi';
  import {  IoHomeOutline} from 'react-icons/io5';
  import { Link } from "react-router-dom";
 
const NavBar = () => {


	return (
   
		<Navbar  expand="lg" className="shadow ">
       <Container className="d-flex">
       <Link to="/home"> <Navbar.Brand href="#home">
    <div className="navbar-icon"> 
  <AiFillLinkedin className="logo"/> L E A R N I N G 
 
  </div></Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />

  <Nav.Link href="#home">
  <AiOutlineUnorderedList className="navbar-logo"/>
	<p className="m-0">Browse</p>
							</Nav.Link>

  <Form inline className="search-wrap">
  <AiOutlineSearch className="d-inline navbar-logo mx-1" /> 
  <FormControl type="text" placeholder="Search" style={{fontSize:"12px"}} className="p-0 m-0 search d-inline" />
     
    </Form>
  <Navbar.Collapse id="basic-navbar-nav" className="ml-auto  ">

    <Link to="/home" className="mr-2">
      <IoHomeOutline className="navbar-logo"/>
	    <p className="m-0">Home</p>
      </Link>
     

      <Link to="/me" className="mr-2">
      <BiBookOpen className="navbar-logo"/>
	    <p className="m-0">My Learning</p> </Link>
      
      <Link to="/languages" className="mr-2">
      <BiWorld className="navbar-logo"/>
	    <p className="m-0">En</p></Link>

    
 
  <Link to="/me">
  <Dropdown className="me ">
								<Dropdown.Toggle  className="profile-menu">
								<Avatar  src="https://upload.wikimedia.org/wikipedia/en/d/d7/Random_person_image.png" className="navbar-logo m-0 p-0" />
									<p style={{fontSize:"12px"}} className="m-0">Me</p>
								</Dropdown.Toggle>
								<Dropdown.Menu
								
									className="dropdown-menu-right"
								/>
							</Dropdown>
              </Link>
              
              </Navbar.Collapse>

              </Container>
</Navbar>

	
		
	)
}

export default withRouter(NavBar)
