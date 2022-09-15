import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SignupJournal() {
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
            <Button variant="secondary" type="submit">
                Sign up
            </Button>
        </Form>
	);
}
