import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from 'axios';
//import {useState} from 'react';

export default function SignupJournal() {
    //const [err, setErr] = useState('')
    const createAccountJournal = (formData) => {
        Axios.post('http://localhost:3000/createJournal',{
            name: formData.target.form[0].value,
            website: formData.target.form[1].value,
            email: formData.target.form[2].value,
            password: formData.target.form[4].value
        }).then((res) => {
            console.log(res)
        })
    }
	return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Journal Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Journal Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWebsite">
                <Form.Label>Journal Website</Form.Label>
                <Form.Control type="text" placeholder="Enter Journal Website" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Journal Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Confirm Email address</Form.Label>
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
	);
}
