import Axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import AlertModal from "../AlertModal";

export default function SignupJournal() {
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");
	const [redirect, setRedirect] = useState(false);
	const createAccountJournal = (formData) => {
		Axios.post("http://localhost:3000/createJournal", {
			name: formData.target.form[0].value,
			website: formData.target.form[1].value,
			email: formData.target.form[2].value,
			password: formData.target.form[4].value,
		}).then(async (res) => {
			if (res.data === "") {
				// popping a modal to tell user that the request was successful.
				setModalTitle("Account successfully created!");
				setModalBody("Redirecting to Login page shortly");
				setShowModal(true);
				setTimeout(() => {
					setRedirect("/login");
				}, 1500);
			} else {
				setModalTitle("Email already in use");
				setModalBody(
					"Please use another email or login here. Contact us here if you think this is a mistake."
				);
				setShowModal(true);
			}
		});
	};
	return (
		<>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Label>Journal Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Journal Name"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicWebsite">
					<Form.Label>Journal Website</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Journal Website"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Journal Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Confirm password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="secondary" onClick={createAccountJournal}>
					Sign up
				</Button>
			</Form>
			<AlertModal
				showVariable={showModal}
				changeVariable={setShowModal}
				title={modalTitle}
				body={modalBody}
			/>
			{redirect && <Navigate replace to={redirect} />}
		</>
	);
}
