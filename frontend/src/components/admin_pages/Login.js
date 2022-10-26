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
	const [redirect, setRedirect] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const login = async (formData) => {
		console.log(formData)
        const res = await Axios.post('http://localhost:3000/loginAdmin',{
            email: formData.target.form[2].value,
            password: formData.target.form[3].value
        })
		if(res.data.err === null && res.data.accountExists === 1 && res.data.passwordCorrect === 1) {
			await setUser({
				loggedIn: true,
				userInfo: res.data.accountDetails[0],
				userRole: 2
			})
			console.log(user)
			setRedirect("/dashboardAdmin");
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
