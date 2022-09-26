import React from "react";
import { Container, Table, Dropdown, Form, ButtonGroup } from "react-bootstrap";

export default function Dashboard() {
	return (
		<Container className="w-75 mt-5">
			<div className="h2 mb-4">Submit a Manuscript</div>
			<Form className="mb-5">
				<div className="d-flex justify-content-evenly text-center mb-3">
					<Form.Group className="mb-3" controlId="formBasicWebsite">
						<Form.Label>Manuscript Link</Form.Label>
						<Form.Control type="text" placeholder="Enter Link" />
					</Form.Group>
					OR
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Upload Manuscript</Form.Label>
						<Form.Control type="file" />
					</Form.Group>
				</div>
				<Form.Check 
					type="switch"
					id="double-blind-switch"
					label="Double blinding"
					className="mb-3"
				/>
				<Form.Group className="mb-3" controlId="formBasicWebsite">
					<Form.Label>Number of reviewers</Form.Label>
					<Form.Control type="text" placeholder="Enter a number or range" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicWebsite">
					<Form.Label>(Optional) Add additional information</Form.Label>
					<Form.Control type="text" placeholder="Enter any relevant information (Have a specific reviewer in mind? Want multiple reviewers?)" />
				</Form.Group>
			</Form>
			<div className="mb-4 d-flex flex-row">
				<div className="h2">Submitted Papers</div>
				<div className="ms-auto">
					<Dropdown>
						<Dropdown.Toggle variant="secondary" id="dropdown-basic">
							Filter by
						</Dropdown.Toggle>
						<Dropdown.Menu className="text-center">
							<Dropdown.Item href="#/action-1">All</Dropdown.Item>
							<Dropdown.Item href="#/action-2">Submitted</Dropdown.Item>
							<Dropdown.Item href="#/action-3">In progress</Dropdown.Item>
							<Dropdown.Item href="#/action-3">Completed</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<Table hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Author</th>
						<th>Status</th>
						<th>Link</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>
							Genesis: The next big thing for evolutionary gene modification for
							the next generation.
						</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>GDoc</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
						<td>GDoc</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
						<td>GDoc</td>
					</tr>
				</tbody>
			</Table>
		</Container>
	);
}
