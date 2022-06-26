import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

export default function Login() {
	return (
		<Container className="w-50 mt-5">
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="I'm a reviewer" />
				</Form.Group>
                <DropdownMenu>
                    <DropdownItem>
                        Regular
                    </DropdownItem>
                    <DropdownItem>
                        Active
                    </DropdownItem>
                </DropdownMenu>
				<Button variant="secondary" type="submit">
					Submit
				</Button>

			</Form>
		</Container>
	);
}
