import React, { useContext, useState, useEffect } from "react";
import { Container, Table, Dropdown, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { UserContext } from "../../contexts/UserContext";

export default function Dashboard() {
	const { user, setUser } = useContext(UserContext);
	const [papers, setPapers] = useState([]);
	const [filter, setFilter] = useState(-1);

	const getPapers = async () => {
		const res = await Axios.get(
			`http://localhost:3000/getPapersJournal/${user.userInfo.id}/${filter}`
		);
		if (res.data.err === null) {
			console.log("papers updated");
			setPapers(res.data.papers);
		}
	};

	const submitPaper = async (data) => {
		console.log(data);
		var link = data.target.form[0].value;
		var file = data.target.form[1].files[0];
		var doubleBlind = data.target.form[2].checked;
		var openReview = data.target.form[3].checked;
		var title = data.target.form[4].value;
		var info = data.target.form[5].value;

		const formData = new FormData();
		formData.append("journal_id", user.userInfo.id)
		formData.append("file", file);
		formData.append("title", title)
		formData.append("link", link)
		formData.append("doubleBlind", doubleBlind)
		formData.append("openReview", openReview)
		formData.append("info", info)



		// const res = await Axios.post("http://localhost:3000/submitPaper", {
		// 	journal_id: user.userInfo.id,
		// 	title: title,
		// 	openReview: openReview,
		// 	doubleBlind: doubleBlind,
		// 	link: link,
		// 	info: info,
		// });
		const res = await Axios.post(
			"http://localhost:3000/submitPaper",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		if (res.data === "") {
			console.log("Paper uploaded");
			getPapers();
		}
	};

	useEffect(() => {
		getPapers();
		console.log("filter", filter);
	}, [filter]);

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
			}}>
			<Container className="w-75 pt-5">
				<div className="h2 mb-4">Submit a Manuscript</div>
				<Form className="mb-4">
					<div className="d-flex justify-content-evenly text-center mb-3">
						<Form.Group className="mb-3 w-25" controlId="formBasicWebsite">
							<Form.Label>Manuscript Link</Form.Label>
							<Form.Control type="text" placeholder="Enter Link" />
						</Form.Group>
						OR
						<Form.Group controlId="formFile" className="mb-3 w-25">
							<Form.Label>Upload PDF</Form.Label>
							<Form.Control type="file" />
						</Form.Group>
					</div>
					<div className="d-flex justify-content-evenly">
						<Form.Check
							type="switch"
							id="double-blind-switch"
							label="Double blinding"
							className="mb-3"
						/>
						<Form.Check
							type="switch"
							id="open-review-switch"
							label="Open to Journal"
							className="mb-3"
						/>
					</div>
					<Form.Group className="mb-3" controlId="formBasicWebsite">
						<Form.Label>Manuscript Title</Form.Label>
						<Form.Control type="text" placeholder="Paper Title" />
					</Form.Group>
					<Form.Group className="mb-4" controlId="formBasicWebsite">
						<Form.Label>(Optional) Add additional information</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter any relevant information (Have a specific reviewer in mind? Want specific formatting?)"
						/>
					</Form.Group>
					<Form.Group className="text-center mb-3" controlId="formBasicWebsite">
						<Button variant="secondary" onClick={submitPaper}>
							Submit
						</Button>
					</Form.Group>
				</Form>
				<div className="mb-4 d-flex flex-row">
					<div className="h2">Submitted Papers</div>
					<div className="ms-auto">
						<Dropdown>
							<Dropdown.Toggle variant="secondary" id="dropdown-basic">
								Filter by
							</Dropdown.Toggle>
							<Dropdown.Menu className="text-center">
								<Dropdown.Item onClick={() => setFilter(-1)} href="#/action-1">
									All
								</Dropdown.Item>
								<Dropdown.Item onClick={() => setFilter(0)} href="#/action-2">
									Submitted
								</Dropdown.Item>
								<Dropdown.Item onClick={() => setFilter(1)} href="#/action-2">
									Assigned
								</Dropdown.Item>
								<Dropdown.Item onClick={() => setFilter(2)} href="#/action-3">
									In progress
								</Dropdown.Item>
								<Dropdown.Item onClick={() => setFilter(3)} href="#/action-3">
									Completed
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
				<Table hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Status</th>
							<th>Open</th>
							<th>Blind</th>
							<th>Link</th>
						</tr>
					</thead>
					<tbody>
						{papers.map(function (object, i) {
							return (
								<tr>
									<td>{i}</td>
									<td>{object.title}</td>
									<td>{object.status}</td>
									<td>{object.open_review}</td>
									<td>{object.double_blind}</td>
									<td>{object.link}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Container>
		</div>
	);
}
