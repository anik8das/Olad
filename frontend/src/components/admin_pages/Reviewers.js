import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Select from "react-select";

export default function Reviewers() {
	const [reviewers, setReviewers] = useState([]);
	const [filter, setFilter] = useState("");
	const [interests, setInterest] = useState([]);

	const getReviewers = async () => {
		const res = await Axios.get(
			`http://localhost:3000/getReviewers/${filter}`
		);
		if (res.data.err === null) {
			setReviewers(res.data.reviewers);
		}
	};

	const getInterests = async () => {
		const res = await Axios.get(`http://localhost:3000/getInterests`);
		if (res.data.err === null) {
			setInterest(
				res.data.interests.map((interest) => ({
					value: interest,
					label: interest,
				}))
			);
		}
	};

	useEffect(() => {
		getReviewers();
		getInterests();
	}, []);

	useEffect(() => {
		getReviewers();
	}, [filter]);

	return (
		<Container className="w-75 pt-5">
			<div className="h2 mb-4">Reviewers</div>
			<Select
				options={interests}
				isClearable={true}
				onChange={(item) => setFilter(item == null ? "" : item.value)}
				className="mb-4"
				placeholder="Filter by interest"
			/>
			{filter}
			<Row xs={2} md={3} className="g-4">
				{reviewers.map((item, idx) => (
					<Col key={idx}>
						<Card className="h-100" key={idx}>
							<Card.Body>
								<Card.Title>{item.name}</Card.Title>
								<Card.Text>
									<span className="fw-bold">ID: </span>
									{item.id} <br />
									<span className="fw-bold">Website: </span>
									{item.website} <br />
									<span className="fw-bold">Interests: </span>
									{item.interests.map((interestItem, idx) =>
										idx === item.interests.length - 1
											? interestItem.interest
											: interestItem.interest + ", "
									)}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}
