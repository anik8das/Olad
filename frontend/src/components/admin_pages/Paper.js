import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Select from "react-select";

export default function Paper(props) {
	const [info, setInfo] = useState({});
	const [matches, setMatches] = useState([]);
	const [reviewers, setReviewers] = useState([]);
	const [reviewerMap, setReviewerMap] = useState({});
	const statusMap = {
		0: "Assigned",
		1: "Accepted",
		2: "Completed",
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
										<Button variant="secondary">
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
					/>
					<Button className="ml-2 pl-2" variant="secondary">
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
