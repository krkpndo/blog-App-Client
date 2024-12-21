import { useState, useContext } from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {NavLink } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function AppNavBar(){

	const {user} = useContext(UserContext);
	console.log(user)

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
		      <Container>
		        <Navbar.Brand as={NavLink} to="/">BlogAPP</Navbar.Brand>

		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		          
		            

	                {(user.id !== null)?
						(user.isAdmin) ?
							<>	
								<Nav.Link as={NavLink} to="/adminDashboard" exact="true">Admin Dashboard</Nav.Link>
								<Nav.Link as={NavLink} to="/getMyBlogs" exact="true">My Blogs</Nav.Link>
								<Nav.Link as={NavLink} to="/getAllBlogs" exact="true">All Blogs</Nav.Link>
								<Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
							</>
							:
							
	                		<>	
                                <Nav.Link as={NavLink} to="/getMyBlogs" exact="true">My Blogs</Nav.Link>
	                			<Nav.Link as={NavLink} to="/getAllBlogs" exact="true">All Blogs</Nav.Link>
	                			<Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
	                		</>
	                :
	                <>
						<Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
	                	<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
	                	<Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
	                </>
	            	}

		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>
	) 

}