import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Card, Row, Col, Table } from "react-bootstrap";
import Select from "react-select";

export default function Paper(props) {
	const [info, setInfo] = useState({});
	const [matches, setMatches] = useState([]);
	const [reviewers, setReviewers] = useState([]);

	const getInfo = async () => {
		console.log("paperID", props.paperID);
		const res = await Axios.get(
			`http://localhost:3000/getPaperInfo/${props.paperID}`
		);
		if (res.data.err === null) {
			setInfo(res.data.paper);
			setMatches(res.data.matches);
			console.log(res.data.paper, res.data.matches);
		}
	};

	const getReviewers = async () => {
		const res = await Axios.get(`http://localhost:3000/getReviewers`);
		if (res.data.err === null) {
			console.log(res.data.reviewers);
			setReviewers(res.data.reviewers);
		}
	};

	useEffect(() => {
		getInfo();
		getReviewers();
	}, []);

	return (
		<Container className="w-50 pt-5">
			<div className="h2 mb-3">{info.title}</div>
			<div className="fs-5 fw-light mb-2">
				<Table hover className="mb-3">
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
				<Table>
					<tbody>
						{matches.map((value, index) => {
							return (
								<tr key={index}>
									<td>Reviewer:{value.reviewer_id}</td>
									<td>Status:{value.status}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				{matches.map((value, index) => {
					return (
						<div key={index}>
							Reviewer:{value.reviewer_id}; Status:{value.status}
						</div>
					);
				})}
			</div>
		</Container>
	);
}
