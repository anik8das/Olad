import React, { useContext, useState, useEffect } from "react";
import { Container, Table, Dropdown, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { UserContext } from "../../contexts/UserContext";

export default function Dashboard() {
	const { user, setUser } = useContext(UserContext);
	const [papers, setPapers] = useState([]);

	useEffect(() => {
		const getPendingPapers = async () => {
			console.log("userr", user);
			const res = await Axios.get(
				`http://localhost:3000/getPendingPapers`
			);
			if (res.data.err === null) {
				setPapers(res.data.papers);
			} else {
				// setModalTitle("Email already in use");
				// setModalBody(
				// 	"Please use another email or login here. Contact us here if you think this is a mistake."
				// );
				// setShowModal(true);
			}
		};
		getPendingPapers();
	}, [user]);

	return (
		<div
			style={{
				backgroundImage: "url(/dashboardBg.jpg)",
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
				paddingBottom: "1%",
				minHeight: "92%"
			}}>
			<Container className="w-75 pt-5">
				<div className="mb-4 d-flex flex-row">
					<div className="h2">Papers pending assignments</div>
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
		</div>
	);
}
