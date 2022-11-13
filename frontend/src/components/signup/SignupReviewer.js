import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import MultipleValueTextInput from "react-multivalue-text-input";
import { useState } from "react";
import Axios from "axios";
import AlertModal from "../AlertModal";

export default function SignupReviewer() {
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [interests, setInterests] = useState(new Set([]));
	const createAccountReviewer = (formData) => {
		// todo: verify everything
		console.log([...interests].join(","));
		Axios.post("http://localhost:3000/createReviewer", {
			name: formData.target.form[0].value,
			website: formData.target.form[1].value,
			interests: [...interests].join(","),
			email: formData.target.form[3].value,
			password: formData.target.form[4].value,
		}).then((res) => {
			console.log("data", res.data);
			if (res.data.err === null) {
				// popping a modal to tell user that the request was successful.
				setModalTitle("Account successfully created!");
				setModalBody("Redirecting to Login page shortly");
				setShowModal(true);
				setTimeout(() => {
					setRedirect("/login");
				}, 1500);
			} else if (res.data.accountCreated === 1) {
				setModalTitle("Account Successfully Created! ");
				setModalBody(
					"However, there was an error uploading your interests but they can be modified after login."
				);
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
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Reviewer Name"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicWebsite">
					<Form.Label>Academic profile/ Personal website</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter website link"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicName">
					<MultipleValueTextInput
						onItemAdded={(item) =>
							setInterests((prev) => new Set(prev).add(item))
						}
						onItemDeleted={(item) =>
							setInterests((prev) => {
								const next = new Set(prev);
								next.delete(item);
								return next;
							})
						}
						label="Interests"
						name="interests"
						placeholder="Enter your fields of expertise"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
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
				<Button variant="secondary" onClick={createAccountReviewer}>
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
