import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">PRAAS</Navbar.Brand>
          <Nav>
            <Nav.Link href="#home">Papers</Nav.Link>
            <Nav.Link href="#reviewers">Reviewers</Nav.Link>
            <Nav.Link href="#link">Account</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            <Nav.Link href="/logout" className='ms-auto'>Logout</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  )
}
