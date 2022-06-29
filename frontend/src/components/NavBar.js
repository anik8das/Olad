import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">PRAAS</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/home">Papers</Nav.Link>
            <Nav.Link as={Link} to="/reviewers">Reviewers</Nav.Link>
            <Nav.Link as={Link} to="/link">Account</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            <Nav.Link as={Link} to="/logout" className='ms-auto'>Logout</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  )
}
