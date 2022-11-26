import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Dropdown, Table } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import RejectionModal from "./RejectionModal";

export default function Dashboard() {
	const { user } = useContext(UserContext);
	const [papers, setPapers] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalPaper, setModalPaper] = useState("");

	const getPapers = async () => {
		const res = await Axios.get(
			`http://localhost:3000/getPapersReviewer/${user.userInfo.id}/0`
		);
		if (res.data.err === null) {
			console.log("papers updated");
			setPapers(res.data.papers);
		}
	};

	const acceptPaper = async (paperID) => {
		const res = await Axios.post(
			`http://localhost:3000/changeReviewerStatus/${paperID}/${user.userInfo.id}/1`
		);
		getPapers();
	};

	const rejectPaper = async (reason) => {
		const res = await Axios.post(
			`http://localhost:3000/changeReviewerStatus/${modalPaper}/${user.userInfo.id}/2`,
			{ reason: reason }
		);
		getPapers();
		setShowModal(false);
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
							<tr key={i}>
								<td>{i}</td>
								<td>{object.title}</td>
								<td>{object.status}</td>
								<td>{object.open_review}</td>
								<td>{object.double_blind}</td>
								<td>{object.link}</td>
								<td>
									<Button
										variant="danger"
										onClick={() => {
											setModalPaper(object.id);
											setShowModal(true);
										}}
									>
										Reject
									</Button>
								</td>
								<td>
									<Button
										variant="success"
										onClick={() => acceptPaper(object.id)}
									>
										Accept
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<RejectionModal
				showVariable={showModal}
				changeVariable={setShowModal}
				rejectPaper={rejectPaper}
				paperID={modalPaper}
			/>
		</Container>
	);
}
