import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function Paper() {
	let { paperID } = useParams();
	const { user } = useContext(UserContext);
	const [info, setInfo] = useState({});
	const [matches, setMatches] = useState([]);
	const [reviewerMap, setReviewerMap] = useState({});
	const statusMap = {
		0: "Assigned",
		1: "Accepted",
		2: "Rejected",
	};

	const getInfo = async () => {
		const res = await Axios.get(
			`http://localhost:3000/getPaperInfo/${paperID}`
		);
		if (res.data.err === null) {
			setInfo(res.data.paper);
			console.log(res.data.matches);
			setMatches(res.data.matches);
		}
	};

	const getReviewers = async () => {
		const res = await Axios.get(`http://localhost:3000/getReviewers`);
		if (res.data.err === null) {
			setReviewerMap(
				res.data.reviewers.reduce(
					(obj, reviewer) =>
						Object.assign(obj, { [reviewer.id]: reviewer.name }),
					{}
				)
			);
		}
	};

	const changeStatus = async (status) => {
		const res = await Axios.post(
			`http://localhost:3000/changeReviewerStatus/${paperID}/${user.userInfo.id}/${status}`
		);
		if (res.data.err === null) {
			setReviewerMap(
				res.data.reviewers.reduce(
					(obj, reviewer) =>
						Object.assign(obj, { [reviewer.id]: reviewer.name }),
					{}
				)
			);
		}
	};

	useEffect(() => {
		getInfo();
		getReviewers();
	}, []);

	return (
		<Container className="w-50 pt-5 pb-3">
			<div className="h2 mb-3">{info.title}</div>
			<div className="fs-5 fw-light mb-2">
				<Table className="mb-3">
					<tbody>
						<tr>
							<th>Paper ID</th>
							<td>{info.id}</td>
						</tr>
						<tr>
							<th>Journal ID</th>
							<td>{info.journal_id}</td>
						</tr>
						<tr>
							<th>Link</th>
							<td>{info.link}</td>
						</tr>
						<tr>
							<th>Submission Date</th>
							<td>{info.submission_date}</td>
						</tr>
						<tr>
							<th>Double Blinded</th>
							<td>{info.double_blind}</td>
						</tr>
						<tr>
							<th>Open Review</th>
							<td>{info.open_review}</td>
						</tr>
						<tr>
							<th>Status</th>
							<td>{info.status}</td>
						</tr>
					</tbody>
				</Table>
				<div className="h2 mb-3 mt-3">Reviewers Assigned</div>
				<Table>
					<tbody>
						{matches.map((value, index) => {
							console.log(value);
							return (
								<tr key={index}>
									<td>{reviewerMap[value.reviewer_id]}</td>
									<td>
										{statusMap[value.status] +
											value.status ===
										2
											? `Reason: ${value.rejection_reason}`
											: ""}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<div className="d-flex mb-4 justify-content-around">
					<Button
						className=""
						variant="danger"
						onClick={() => changeStatus(2)}
					>
						Reject
					</Button>
					<Button
						className=""
						variant="success"
						onClick={() => changeStatus(1)}
					>
						Accept
					</Button>
				</div>
			</div>
		</Container>
	);
}
