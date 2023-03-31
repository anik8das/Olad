import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import { UserContext } from "../../contexts/UserContext";
import AlertModal from "../AlertModal";
import { boolMap, statusMapPaper } from "../Constants";

export default function Dashboard() {
	const { user } = useContext(UserContext);
	const [papers, setPapers] = useState([]);
	const [reviewers, setReviewers] = useState([]);
	const [reviewerMap, setReviewerMap] = useState(new Map());
	const [status, setStatus] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");

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
			setModalTitle("Success");
			setModalBody(
				"Successfully assigned reviewers to the paper. You can click the paper index to view more details on the paper"
			);
			setShowModal(true);
		} else {
			setModalTitle("Error while assigning reviewers!");
			setModalBody("Please try again.");
			setShowModal(true);
		}
	};
	const getPapers = async () => {
		const res = await Axios.get(
			`https://olad-backend.herokuapp.com/getPapersAdmin/${status}`
		);
		if (res.data.err === null) {
			setPapers(res.data.papers);
		} else {
			setModalTitle("Error while getting papers!");
			setModalBody("Please try again.");
			setShowModal(true);
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
	}, [status]);

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
					<div className="h2">Papers {statusMapPaper[status]}</div>
					<div className="ms-auto">
						<Dropdown>
							<Dropdown.Toggle
								variant="secondary"
								id="dropdown-basic"
							>
								Filter by
							</Dropdown.Toggle>
							<Dropdown.Menu className="text-center">
								<Dropdown.Item
									onClick={() => setStatus(0)}
									href="#/action-2"
								>
									Submitted
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => setStatus(1)}
									href="#/action-2"
								>
									Assigned
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => setStatus(2)}
									href="#/action-3"
								>
									In progress
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => setStatus(3)}
									href="#/action-3"
								>
									Completed
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
										<td>{boolMap[object.open_review]}</td>
										<td>{boolMap[object.double_blind]}</td>
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
				) : (
					<div className="d-flex ">
						No papers to show! Try a different status in the
						dropdown above
					</div>
				)}
			</Container>
			<AlertModal
				showVariable={showModal}
				changeVariable={setShowModal}
				title={modalTitle}
				body={modalBody}
			/>
		</div>
	);
}
