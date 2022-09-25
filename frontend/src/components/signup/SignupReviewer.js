import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MultipleValueTextInput from 'react-multivalue-text-input';
import { useState, useContext } from "react";
import Axios from 'axios';
import { UserContext } from "../../contexts/UserContext";

export default function SignupReviewer() {
    const { user, setUser } = useContext(UserContext);
    const [interests, setInterests] = useState(new Set([]));
    const createAccountReviewer = (formData) => {
        // todo: verify everything
        console.log([...interests].join(','))
        Axios.post('http://localhost:3000/createReviewer',{
            name: formData.target.form[0].value,
            website: formData.target.form[1].value,
            interests: [...interests].join(','),
            email: formData.target.form[3].value,
            password: formData.target.form[4].value
        }).then((res) => {
            if(res.data.err === '') {
                setUser({
                    loggedIn: true,
                    userInfo: {}
                })
            }
            console.log(res.data)
        })
        setUser({
            loggedIn: true,
            userInfo: {}
        })
        console.log('changed user')
    }

	return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Reviewer Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWebsite">
                <Form.Label>Academic profile/ Personal website</Form.Label>
                <Form.Control type="text" placeholder="Enter website link" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <MultipleValueTextInput
                    onItemAdded={(item) => setInterests(prev => new Set(prev).add(item))}
                    onItemDeleted={(item) => setInterests(prev => {
                        const next = new Set(prev);
                        next.delete(item);
                        return next;
                      })}
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
            <Button variant="secondary"  onClick={createAccountReviewer}>
                Sign up
            </Button>
        </Form>
	);
}
