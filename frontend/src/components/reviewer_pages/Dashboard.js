import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import RejectionModal from "./RejectionModal";

export default function Dashboard() {
	const { user } = useContext(UserContext);
	const [papers, setPapers] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalPaper, setModalPaper] = useState("");
	const [pending, setPending] = useState(true);

	const getPapers = async () => {
		const res = await Axios.get(
			`https://olad-backend.herokuapp.com/getPapersReviewer/${
				user.userInfo.id
			}/${pending ? 0 : 1}`
		);
		if (res.data.err === null) {
			console.log("papers updated");
			setPapers(res.data.papers);
		}
	};

	const acceptPaper = async (paperID) => {
		const res = await Axios.post(
			`https://olad-backend.herokuapp.com/changeReviewerStatus/${paperID}/${user.userInfo.id}/3`
		);
		getPapers();
	};

	const rejectPaper = async (reason) => {
		const res = await Axios.post(
			`https://olad-backend.herokuapp.com/changeReviewerStatus/${modalPaper}/${user.userInfo.id}/2`,
			{ reason: reason }
		);
		getPapers();
		setShowModal(false);
	};

	const finishReview = async () => {};

	useEffect(() => {
		getPapers();
	}, [pending]);

	return (
		<Container className="w-75 mt-5">
			<div className="mb-4 d-flex flex-row">
				<div className="h2">
					{pending ? "Assigned" : "In progress"} papers
				</div>
				<div className="ms-auto">
					<Dropdown>
						<Dropdown.Toggle
							variant="secondary"
							id="dropdown-basic"
						>
							Show
						</Dropdown.Toggle>
						<Dropdown.Menu className="text-center">
							<Dropdown.Item onClick={() => setPending(true)}>
								Pending
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setPending(false)}>
								In Progress
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
								<td>
									<Link
										to={`/paperReviewer/${object.id}`}
										replace={true}
									>
										{object.id}
									</Link>
								</td>
								<td>{object.title}</td>
								<td>{object.status}</td>
								<td>{object.open_review}</td>
								<td>{object.double_blind}</td>
								<td>{object.link}</td>
								{pending ? (
									<React.Fragment>
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
												onClick={() =>
													finishReview(object.id)
												}
											>
												Accept
											</Button>
										</td>
									</React.Fragment>
								) : (
									<td>
										<Button
											variant="success"
											onClick={() =>
												acceptPaper(object.id)
											}
										>
											Submit review
										</Button>
									</td>
								)}
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
