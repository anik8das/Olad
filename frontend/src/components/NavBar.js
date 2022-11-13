import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function NavBar() {
	const { user, setUser } = useContext(UserContext);
	return (
		<Navbar bg="dark" className="" style={{ height: "8%" }} variant="dark">
			<Container>
				<Navbar.Brand as={Link} to="/">
					OLAD
				</Navbar.Brand>
				<Nav>
					<Nav.Link as={Link} to="/about">
						About
					</Nav.Link>
					{user.loggedIn === true && user.userRole === 1 && (
						<Nav.Link as={Link} to="/dashboardJournal">
							Dashboard
						</Nav.Link>
					)}
					{user.loggedIn === true && user.userRole === 0 && (
						<Nav.Link as={Link} to="/dashboardReviewer">
							Dashboard
						</Nav.Link>
					)}
					{user.loggedIn === true && user.userRole === 2 && (
						<Nav.Link as={Link} to="/dashboardAdmin">
							Dashboard
						</Nav.Link>
					)}
					{user.loggedIn === true && (
						<Nav.Link as={Link} to="/account">
							Account
						</Nav.Link>
					)}
					{user.loggedIn === true && user.userRole === 2 && (
						<Nav.Link as={Link} to="/reviewers">
							Reviewers
						</Nav.Link>
					)}
				</Nav>
				<Nav className="ms-auto">
					{user.loggedIn === true && (
						<Nav.Link as={Link} to="/logout" className="ms-auto">
							Logout
						</Nav.Link>
					)}
					{user.loggedIn === false && (
						<div className="d-flex flex-row mb-1 ms-auto">
							<Nav.Link as={Link} to="/login" className="">
								Login
							</Nav.Link>
							<Nav.Link as={Link} to="/signup" className="">
								Signup
							</Nav.Link>
						</div>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}
