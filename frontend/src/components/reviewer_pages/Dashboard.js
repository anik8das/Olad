import React from "react";
import { Container, Table, Dropdown } from "react-bootstrap";

export default function Dashboard() {
	return (
		<Container className="w-75 mt-5">
			<div className="mb-3 d-flex flex-row">
				<div className="h1">Papers</div>
				<div className="ms-auto mt-3">
					<Dropdown>
						<Dropdown.Toggle variant="secondary" id="dropdown-basic">
							Filter by
						</Dropdown.Toggle>

						<Dropdown.Menu className="text-center">
							<Dropdown.Item href="#/action-1">All</Dropdown.Item>
							<Dropdown.Item href="#/action-2">Received</Dropdown.Item>
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
