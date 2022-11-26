import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Select from "react-select";

export default function Paper(props) {
	const [info, setInfo] = useState({});
	const [matches, setMatches] = useState([]);
	const [reviewers, setReviewers] = useState([]); // for the select react component
	const [reviewerMap, setReviewerMap] = useState({}); // for getting reviewer details in constant time
	const [reviewerList, setReviewerList] = useState([]); // for storing the new matches
	const statusMap = {
		0: "Assigned",
		1: "Accepted",
		2: "Rejected",
	};

	const getInfo = async () => {
		const res = await Axios.get(
			`http://localhost:3000/getPaperInfo/${props.paperID}`
		);
		if (res.data.err === null) {
			setInfo(res.data.paper);
			setMatches(res.data.matches);
		}
	};

	const getReviewers = async () => {
		const res = await Axios.get(`http://localhost:3000/getReviewers`);
		if (res.data.err === null) {
			setReviewers(
				res.data.reviewers.map((reviewer) => ({
					value: reviewer.id,
					label: reviewer.name,
				}))
			);
			setReviewerMap(
				res.data.reviewers.reduce(
					(obj, reviewer) =>
						Object.assign(obj, { [reviewer.id]: reviewer.name }),
					{}
				)
			);
		}
	};

	const removeReviewer = async (reviewerID) => {
		const res = await Axios.post(
			`http://localhost:3000/changeReviewerStatus/${props.paperID}/${reviewerID}/0`
		);
		if (res.data.err === null) {
			// Todo: Pop modal
			console.log("Successfully removed reviewed");
			getInfo();
		}
	};

	const assignPaper = async () => {
		console.log(reviewerList, reviewerMap, reviewers);
		const res = await Axios.post(
			`http://localhost:3000/assignPaper/${props.paperID}`,
			{
				reviewers: reviewerList,
			}
		);
		console.log(res);
		if (res.data === "") {
			getInfo();
		} else {
			// setModalTitle("Email already in use");
			// setModalBody(
			// 	"Please use another email or login here. Contact us here if you think this is a mistake."
			// );
			// setShowModal(true);
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
							return (
								<tr key={index}>
									<td>{reviewerMap[value.reviewer_id]}</td>
									<td>{statusMap[value.status]}</td>
									<td>
										<Button
											variant="warning"
											onClick={() =>
												removeReviewer(
													value.reviewer_id
												)
											}
										>
											Remove
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<div className="d-flex mb-4 justify-content-around">
					<Select
						options={reviewers}
						isClearable={true}
						isMulti={true}
						className="w-75"
						placeholder="Assign more reviewers"
						onChange={(revList) => {
							setReviewerList(revList.map((item) => item.value));
						}}
					/>
					<Button
						className="ml-2 pl-2"
						variant="secondary"
						onClick={() => assignPaper()}
					>
						Assign
					</Button>
				</div>
				<Button className="mx-auto d-flex" variant="secondary">
					Start Review
				</Button>
			</div>
		</Container>
	);
}
