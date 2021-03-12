import React, { useCallback, useEffect, useState } from "react"
import "./NavBar.css";
import {Navbar,Form ,Nav,Button,FormControl,Dropdown
  
  } from "react-bootstrap";
  import {Avatar, Badge} from '@material-ui/core';
  import { withRouter } from "react-router-dom";
  import {AiOutlineUnorderedList,AiOutlineSearch} from 'react-icons/ai';
  import { BiBookOpen,BiWorld} from 'react-icons/bi';
  import {  IoHomeOutline} from 'react-icons/io5';
 
const NavBar = () => {


	return (
		<Navbar  expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />

  <Nav.Link href="#home">
  <AiOutlineUnorderedList className="navbar-logo"/>
	<p className="m-0">Notifications</p>
							</Nav.Link>

  <Form inline className="search-wrap">
  <AiOutlineSearch className="d-inline" /> 
  <FormControl type="text" placeholder="Search" className="mr-sm-2 search d-inline" />
     
    </Form>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link href="#home"> 
      <IoHomeOutline className="navbar-logo"/>
	    <p className="m-0">Home</p></Nav.Link>
     

      <Nav.Link href="#mylearning"> 
      <BiBookOpen className="navbar-logo"/>
	    <p className="m-0">My Learning</p></Nav.Link>
      
      <Nav.Link href="#language"> 
      <BiWorld className="navbar-logo"/>
	    <p className="m-0">Language</p></Nav.Link>
    </Nav>
   
   
  </Navbar.Collapse>
  <Dropdown className="me px-3">
								<Dropdown.Toggle  className="Profile-menu">
								<Avatar  src="https://upload.wikimedia.org/wikipedia/en/d/d7/Random_person_image.png" className="navbar-logo m-0 p-0" />
									<p className="m-0">Me</p>
								</Dropdown.Toggle>
								<Dropdown.Menu
								
									className="dropdown-menu-right"
								/>
							</Dropdown>

</Navbar>
	
		
	)
}

export default withRouter(NavBar)
