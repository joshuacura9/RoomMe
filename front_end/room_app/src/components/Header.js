import React from 'react';
import { Link } from 'react-router-dom';
import * as ReactBootstrap from "react-bootstrap";

const Header = () => {
  return (
    <container-fluid className="Header">
    	  <ReactBootstrap.Navbar collapseOnSelect expand="lg" variant="dark" style= {{ backgroundColor: 'rgb(35,31,32)' }} >
    	  <ReactBootstrap.Navbar.Brand href="#home">Welcome!</ReactBootstrap.Navbar.Brand>
  		  <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  		  <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
    	  <ReactBootstrap.Nav className="mr-auto">
    	  <Link to={'/'}>
      	<ReactBootstrap.Nav.Link href="#Home">Home</ReactBootstrap.Nav.Link>
      	</Link>
      	<Link to={'/Dashboard'}>
      	<ReactBootstrap.Nav.Link href="#Dashboard">Dashboard</ReactBootstrap.Nav.Link>
      	</Link>
      	<ReactBootstrap.NavDropdown title="Options" id="collasible-nav-dropdown">
        <Link to={'/Contact'}>
        <ReactBootstrap.NavDropdown.Item href="#Contact">Contact</ReactBootstrap.NavDropdown.Item>
        </Link>
        <Link to={'/About'}>
        <ReactBootstrap.NavDropdown.Item href="#About">About</ReactBootstrap.NavDropdown.Item>
        </Link>
        <ReactBootstrap.NavDropdown.Item href="#action/3.3">Terms</ReactBootstrap.NavDropdown.Item>
        <ReactBootstrap.NavDropdown.Divider />
        <ReactBootstrap.NavDropdown.Item href="#action/3.4">Report</ReactBootstrap.NavDropdown.Item>
      	</ReactBootstrap.NavDropdown>
    	  </ReactBootstrap.Nav>
    	 <ReactBootstrap.Nav>
         <Link to={'/Register'}>
    	  <ReactBootstrap.Nav.Link href="Signup">Signup</ReactBootstrap.Nav.Link>
        </Link>
		    <Link to={'/Login'}>
        <ReactBootstrap.Nav.Link eventKey={2} href="Login">
        	Login
      	</ReactBootstrap.Nav.Link>
        </Link>
    	  </ReactBootstrap.Nav>
 	 	    </ReactBootstrap.Navbar.Collapse>
		    </ReactBootstrap.Navbar>
	</container-fluid >
        // <Link to={'/'}>Home</Link>
        // <Link to={'/Dashboard'}>Dashboard</Link>
  );
};

export default Header;


