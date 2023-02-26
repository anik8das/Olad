import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import { UserContext } from "../../contexts/UserContext";

export default function Dashboard() {
	const { user } = useContext(UserContext);
	const [papers, setPapers] = useState([]);
	const [reviewers, setReviewers] = useState([]);
	const [reviewerMap, setReviewerMap] = useState(new Map());
	const [pending, setPending] = useState(true);

	const assignPaper = async (paper_id) => {
		const res = await Axios.post(
			`https://olad-backend.herokuapp.com/assignPaper/${paper_id}`,
			{
				reviewers: reviewerMap.get(paper_id),
			}
		);
		if (res.data === "") {
			setReviewerMap(new Map());
			getPapers();
		} else {
			// setModalTitle("Email already in use");
			// setModalBody(
			// 	"Please use another email or login here. Contact us here if you think this is a mistake."
			// );
			// setShowModal(true);
		}
	};
	const getPapers = async () => {
		const res = await Axios.get(
			`https://olad-backend.herokuapp.com/getPapersAdmin/${
				pending ? 0 : 1
			}`
		);
		if (res.data.err === null) {
			setPapers(res.data.papers);
		} else {
			// setModalTitle("Email already in use");
			// setModalBody(
			// 	"Please use another email or login here. Contact us here if you think this is a mistake."
			// );
			// setShowModal(true);
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
		}
	};

	useEffect(() => {
		getPapers();
		getReviewers();
	}, [user]);

	useEffect(() => {
		getPapers();
	}, [pending]);

	return (
		<div
			style={{
				backgroundImage: "url(/dashboardBg.jpg)",
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
				paddingBottom: "1%",
				minHeight: "92%",
			}}
		>
			<Container className="w-75 pt-5">
				<div className="mb-4 d-flex flex-row">
					<div className="h2">
						Papers {pending ? "pending assignments" : "in progress"}
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
								<Dropdown.Item
									onClick={() => setPending(false)}
								>
									In Progress
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
				<div className="mb-4">
					For a full list of reviewers and their interests, go to the
					Reviewers page!
				</div>
				{papers.length > 0 ? (
					<Table hover responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
								<th>Journal</th>
								<th>Open</th>
								<th>Blind</th>
								<th>Link</th>
								<th>Reviewers</th>
								<th>Assign</th>
							</tr>
						</thead>
						<tbody>
							{papers.map(function (object, i) {
								return (
									<tr key={i}>
										<td>
											<Link
												to={`/paperAdmin/${object.id}`}
												replace={true}
											>
												{object.id}
											</Link>
										</td>
										<td>{object.title}</td>
										<td>{object.journal_id}</td>
										<td>{object.open_review}</td>
										<td>{object.double_blind}</td>
										<td>{object.link}</td>
										<td>
											<Select
												key={i}
												options={reviewers}
												isClearable={true}
												isMulti={true}
												value={reviewerMap[object.id]}
												onChange={(item) => {
													setReviewerMap(
														(map) =>
															new Map(
																map.set(
																	object.id,
																	item.map(
																		(
																			elem
																		) =>
																			elem.value
																	)
																)
															)
													);
												}}
												className="mb-4"
											/>
										</td>
										<td>
											<Button
												variant="secondary"
												onClick={() =>
													assignPaper(object.id)
												}
											>
												Assign
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				) : pending === true ? (
					<div className="d-flex ">
						No pending papers!
						<div
							className="text-decoration-underline"
							onClick={() => setPending(false)}
						>
							{" "}
							Show in progress papers{" "}
						</div>
					</div>
				) : (
					<div className="d-flex ">
						No in progress papers!
						<div
							className="text-decoration-underline"
							onClick={() => setPending(true)}
						>
							{" "}
							Show pending papers{" "}
						</div>
					</div>
				)}
			</Container>
		</div>
	);
}
