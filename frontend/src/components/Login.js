import React from "react";
import {useState, useContext} from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import AlertModal from "./AlertModal";
import Axios from 'axios';
import { UserContext } from "../contexts/UserContext";


export default function Login() {
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");
	const [journalToggle, setJournalToggle] = useState(1)
	const [redirect, setRedirect] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const login = async (formData) => {
		console.log(formData)
        const res = await Axios.post('http://localhost:3000/login',{
            email: formData.target.form[2].value,
            password: formData.target.form[3].value,
			journal: journalToggle
        })
		if(res.data.err === null && res.data.accountExists === 1 && res.data.passwordCorrect === 1) {
			await setUser({
				loggedIn: true,
				userInfo: res.data.accountDetails[0],
				userRole: journalToggle
			})
			console.log(user)
			var temp = "/dashboard"
			temp += journalToggle?"Journal":"Reviewer"
			console.log(temp)
			setRedirect(temp);
		}
		else if(res.data.err === null && res.data.accountExists === 1 && res.data.passwordCorrect === 0){
			setModalTitle("Incorrect password");
			setModalBody(
				"Please try again, or reset your password here"
			);
			setShowModal(true);
		}
		else if (res.data.err != null) {
			setModalTitle("Internal server error");
			setModalBody(
				"Please try again"
			);
			setShowModal(true);
			console.log('error')
		}
		else {
			setModalTitle("No account exists with this email");
			setModalBody(
				"Please try again, or create an account here."
			);
			setShowModal(true);
		}
    }

	return (
		<Container className="w-50 mt-5">
			<Form>
				<Form.Group className="mb-3" controlId="formBasicToggle">
					<ButtonGroup>
						<ToggleButton
							key={1}
							type="radio"
							variant="secondary"
							checked={journalToggle === 1}
							onClick={() => setJournalToggle(1)}>
							Journal
						</ToggleButton>
						<ToggleButton
							key={0}
							type="radio"
							variant="secondary"
							checked={journalToggle === 0}
							onClick={() => setJournalToggle(0)}>
							Reviewer
						</ToggleButton>
					</ButtonGroup>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="secondary" onClick={login}>
					Login
				</Button>
			</Form>
			<AlertModal
				showVariable={showModal}
				changeVariable={setShowModal}
				title={modalTitle}
				body={modalBody}
			/>
			{redirect && <Navigate replace to={redirect} />}
		</Container>
	);
}
