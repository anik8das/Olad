import React, { useState } from "react";
import { Axios } from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

export default function Reviewers() {
	const [reviewers, setReviewers] = useState([]);
	const [filter, setFilter] = useState("");

	const getReviewers = async () => {
		const res = await Axios.get(`http://localhost:3000/getReviewers/${filter}`);
		if (res.data.err === null) {
			setReviewers(res.data.reviewers);
		}
	};

	return (
		<CardGroup>
			<Card>
				<Card.Body>
					<Card.Title>Card title</Card.Title>
					<Card.Text>
						This is a wider card with supporting text below as a natural lead-in
						to additional content. This content is a little bit longer.
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Last updated 3 mins ago</small>
				</Card.Footer>
			</Card>
			<Card>
				<Card.Body>
					<Card.Title>Card title</Card.Title>
					<Card.Text>
						This card has supporting text below as a natural lead-in to
						additional content.{" "}
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Last updated 3 mins ago</small>
				</Card.Footer>
			</Card>
			<Card>
				<Card.Body>
					<Card.Title>Card title</Card.Title>
					<Card.Text>
						This is a wider card with supporting text below as a natural lead-in
						to additional content. This card has even longer content than the
						first to show that equal height action.
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Last updated 3 mins ago</small>
				</Card.Footer>
			</Card>
			<Card>
				<Card.Body>
					<Card.Title>Card title</Card.Title>
					<Card.Text>
						This is a wider card with supporting text below as a natural lead-in
						to additional content. This card has even longer content than the
						first to show that equal height action.
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Last updated 3 mins ago</small>
				</Card.Footer>
			</Card>
			<Card>
				<Card.Body>
					<Card.Title>Card title</Card.Title>
					<Card.Text>
						This is a wider card with supporting text below as a natural lead-in
						to additional content. This card has even longer content than the
						first to show that equal height action.
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Last updated 3 mins ago</small>
				</Card.Footer>
			</Card>
		</CardGroup>
	);
}
