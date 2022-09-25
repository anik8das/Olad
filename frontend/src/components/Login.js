import React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Axios from 'axios';

export default function Login() {
	const [journalToggle, setJournalToggle] = useState(0)

	const login = async (formData) => {
        const response = await Axios.post('http://localhost:3000/login',{
            email: formData.target.form[0].value,
            password: formData.target.form[1].value,
			journal: journalToggle
        })
		console.log('res', response)
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
				<Form.Group className="mb-3" controlId="formBasicToggle">
					<ButtonGroup className="mb-2">`
						<ToggleButton
							key={0}
							type="radio"
							variant="secondary"
							checked={journalToggle === 0}
							onClick={()=>setJournalToggle(0)}
						>
							Reviewer
						</ToggleButton>
						<ToggleButton
							key={1}
							type="radio"
							variant="secondary"
							checked={journalToggle === 1}
							onClick={()=>setJournalToggle(1)}
						>
							Journal
						</ToggleButton>
					</ButtonGroup>`
				</Form.Group>
				<Button variant="secondary" onClick={login}>
					Login
				</Button>
			</Form>
		</Container>
	);
}
