import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Container, Table, Dropdown } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";

export default function Dashboard() {
	const { user, setUser } = useContext(UserContext);
	const [papers, setPapers] = useState([]);

	const getPapers = async () => {
		const res = await Axios.get(
			`http://localhost:3000/getPapersReviewer/${user.userInfo.id}`
		);
		if (res.data.err === null) {
			console.log("papers updated");
			setPapers(res.data.papers);
		}
	};

	useEffect(() => {
		getPapers();
	}, []);

	return (
		<Container className="w-75 mt-5">
			<div className="mb-4 d-flex flex-row">
				<div className="h2">Assigned papers</div>
				<div className="ms-auto">
					<Dropdown>
						<Dropdown.Toggle
							variant="secondary"
							id="dropdown-basic"
						>
							Filter by
						</Dropdown.Toggle>
						<Dropdown.Menu className="text-center">
							<Dropdown.Item href="#/action-1">All</Dropdown.Item>
							<Dropdown.Item href="#/action-2">
								Submitted
							</Dropdown.Item>
							<Dropdown.Item href="#/action-3">
								In progress
							</Dropdown.Item>
							<Dropdown.Item href="#/action-3">
								Completed
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<Table hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Status</th>
						<th>Open</th>
						<th>Blind</th>
						<th>Link</th>
					</tr>
				</thead>
				<tbody>
					{papers.map(function (object, i) {
						return (
							<tr>
								<td>{i}</td>
								<td>{object.title}</td>
								<td>{object.status}</td>
								<td>{object.open_review}</td>
								<td>{object.double_blind}</td>
								<td>{object.link}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</Container>
	);
}
