import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";

export default function Reviewers() {
	const [reviewers, setReviewers] = useState([]);
	const [filter, setFilter] = useState("");

	const getReviewers = async () => {
		const res = await Axios.get(`http://localhost:3000/getReviewers/${filter}`);
		if (res.data.err === null) {
			console.log(res.data)
			setReviewers(res.data.reviewers);
		}
	};

	useEffect(() => {
		getReviewers();
	}, []);


	return (
		<Container className="w-75 pt-5">
			<Row xs={2} md={3} className="g-4">
				{reviewers.map((item, idx) => (
					<Col>
						<Card className="h-100">
							<Card.Body>
								<Card.Title>{item.name}</Card.Title>
								<Card.Text>
									<span class="fw-bold">ID: </span>{item.id} <br/>
									<span class="fw-bold">Website: </span>{item.website} <br/>
									<span class="fw-bold">Interests: </span>{item.interests.map((interestItem, idx) => (
										idx === item.interests.length-1? interestItem.interest: interestItem.interest+', '
									))}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}
