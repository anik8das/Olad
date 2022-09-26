import React from "react";
import { Modal, Button } from "react-bootstrap";

export function DuplicateEmail(props) {
	return (
		<Modal
			show={props.showModal}
			onHide={() => {
				console.log(props.showModal, props.setShowModal);
				props.setShowModal(false);
			}}>
			<Modal.Header closeButton>
				<Modal.Title>Email already in use</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Please use another email. Login here or contact us here if you think
				this is a mistake.
			</Modal.Body>
		</Modal>
	);
}

export function ErrorRetry() {
	return <div>AuthAlerts</div>;
}
