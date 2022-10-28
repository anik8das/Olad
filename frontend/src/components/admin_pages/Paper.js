import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";
import Select from "react-select";

export default function Paper(paperID) {
	const [info, setInfo] = useState({});

	const getInfo = async () => {
		const res = await Axios.get(
			`http://localhost:3000/getPaperInfo/${paperID}`
		);
		if (res.data.err === null) {
			console.log(res.data);
			setInfo(res.data.reviewers);
		}
	};

	useEffect(() => {
		getInfo();
	}, []);

	return (
		<Container className="w-50 pt-5">
			<div className="h2 mb-3">Title</div>
			<div className="fs-5 fw-light mb-2">Paper ID</div>
			<div className="fs-5 fw-light mb-2">Journal</div>
			<div className="fs-5 fw-light mb-2">Link</div>
			<div className="fs-5 fw-light mb-2">Submission Date</div>
			<div className="fs-5 fw-light mb-2">Double Blinded</div>
			<div className="fs-5 fw-light mb-2">Open review</div>
			<div className="fs-5 fw-light mb-2">Status</div>
			<div className="fs-5 fw-light mb-2">Reviewer Accepted</div>
			<div className="fs-5 fw-light mb-2">Reviewer Rejected. Reason: </div>
			<div className="fs-5 fw-light mb-2">Reviewer Pending action </div>
		</Container>
	);
}
