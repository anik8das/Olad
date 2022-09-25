import React, {useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">PRAAS</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/link">Account</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {user.loggedIn === true && <Nav.Link as={Link} to="/logout" className='ms-auto'>Logout</Nav.Link>}
            {user.loggedIn === false && 
            <div className='d-flex flex-row mb-1'>
              <Nav.Link as={Link} to="/login" className='ms-auto'>Login</Nav.Link>
              <Nav.Link as={Link} to="/signup" className='ms-auto'>Signup</Nav.Link>
            </div>
            }
          </Nav>
      </Container>
    </Navbar>
  )
}
