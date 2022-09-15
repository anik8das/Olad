import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MultipleValueTextInput from 'react-multivalue-text-input';

export default function SignupReviewer() {
	return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Reviewer Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWebsite">
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" placeholder="Enter Reviewer Website" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWebsite">
                <Form.Label>Additional website</Form.Label>
                <Form.Control type="text" placeholder="Enter Additional Website (optional)" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <MultipleValueTextInput
                    onItemAdded={(item, allItems) => console.log(`Item added: ${item}`)}
                    onItemDeleted={(item, allItems) => console.log(`Item removed: ${item}`)}
                    label="Interests"
                    name="interests"
                    placeholder="Enter your fields of expertise"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
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
