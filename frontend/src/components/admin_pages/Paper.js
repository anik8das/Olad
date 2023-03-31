import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";
import AlertModal from "../AlertModal";
import { boolMap, statusMapPaper, statusMapReviewer } from "../Constants";

export default function Paper() {
	let { paperID } = useParams();
	const [info, setInfo] = useState({});
	const [matches, setMatches] = useState([]);
	const [reviewers, setReviewers] = useState([]); // for the select react component
	const [reviewerMap, setReviewerMap] = useState({}); // for getting reviewer details in constant time
	const [reviewerList, setReviewerList] = useState([]); // for storing the new matches
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");
	const [newStatus, setNewStatus] = useState(2);

	const getInfo = async () => {
		const res = await Axios.get(
			`https://olad-backend.herokuapp.com/getPaperInfo/${paperID}`
		);
		if (res.data.err === null) {
			setInfo(res.data.paper);
			setMatches(res.data.matches);
		}
	};

	const getReviewers = async () => {
		const res = await Axios.get(
			`https://olad-backend.herokuapp.com/getReviewers`
		);
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
			`https://olad-backend.herokuapp.com/changeReviewerStatus/${paperID}/${reviewerID}/0`
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
			`https://olad-backend.herokuapp.com/assignPaper/${paperID}`,
			{
				reviewers: reviewerList,
			}
		);
		console.log(res);
		if (res.data === "") {
			getInfo();
		} else {
			setModalTitle("Failed to assign paper");
			setModalBody("Please try again later");
			setShowModal(true);
		}
	};

	const startReview = async () => {
		const res = await Axios.post(
			`https://olad-backend.herokuapp.com/changePaperStatus/${paperID}/${newStatus}`
		);
		if (res.data.err === null) {
			setModalTitle("Success!");
			setModalBody("Changed paper status");
			setShowModal(true);
		} else {
			setModalTitle("Failed to start review");
			setModalBody("Please try again later");
			setShowModal(true);
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
							<th>Paper title</th>
							<td>{info.title}</td>
						</tr>
						<tr>
							<th>Journal ID</th>
							<td>{info.journal_id}</td>
						</tr>
						<tr>
							<th>Journal Name</th>
							<td>{info.journal_name}</td>
						</tr>
						<tr>
							<th>Link</th>
							<td>
								{info.link}{" "}
								<Button variant="link">change link</Button>
							</td>
						</tr>
						<tr>
							<th>Submission Date</th>
							<td>{info.submission_date}</td>
						</tr>
						<tr>
							<th>Double Blinded</th>
							<td>{boolMap[info.double_blind]}</td>
						</tr>
						<tr>
							<th>Open Review</th>
							<td>{boolMap[info.open_review]}</td>
						</tr>
						<tr>
							<th>Status</th>
							<td>{statusMapPaper[info.status]}</td>
						</tr>
					</tbody>
				</Table>
				<div className="h2 mb-3 mt-3">Reviewers Assigned</div>
				<Table className="mb-3">
					<tbody>
						{matches.map((value, index) => {
							console.log(value);
							return (
								<tr key={index}>
									<td>{reviewerMap[value.reviewer_id]}</td>
									<td>{statusMapReviewer[value.status]}</td>
									{value.status !== 2 && (
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
									)}
									{value.status === 2 && (
										<td>
											Reason: {value.rejection_reason}
										</td>
									)}
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
				<div className="d-flex justify-content-around text-center">
					<Dropdown>
						<Dropdown.Toggle
							variant="secondary"
							id="dropdown-basic"
						>
							Change status to {statusMapPaper[newStatus]}
						</Dropdown.Toggle>
						<Dropdown.Menu className="text-center">
							<Dropdown.Item
								onClick={() => setNewStatus(0)}
								href="#status-0"
							>
								Submitted
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setNewStatus(1)}
								href="#status-1"
							>
								Assigned
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setNewStatus(2)}
								href="#status-2"
							>
								In progress
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => setNewStatus(3)}
								href="#status-3"
							>
								Completed
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Button
						className=""
						variant="warning"
						onClick={() => {
							startReview();
							getInfo();
						}}
					>
						Confirm change status
					</Button>
				</div>
			</div>
			<AlertModal
				showVariable={showModal}
				changeVariable={setShowModal}
				title={modalTitle}
				body={modalBody}
			/>
		</Container>
	);
}
