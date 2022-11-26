import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function RejectionModal(props) {
	const [rejectReason, setRejectReason] = useState("");

	return (
		<Modal
			show={props.showVariable}
			onHide={() => {
				props.changeVariable(false);
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>Reject the paper?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlTextarea1"
				>
					<Form.Label>
						Please state your reason for rejecting the paper:
					</Form.Label>
					<Form.Control
						as="textarea"
						value={rejectReason}
						onChange={(item) => {
							setRejectReason(item.target.value);
						}}
						rows={3}
					/>
					<Button
						variant="warning"
						onClick={() => props.rejectPaper(rejectReason)}
						className="mt-4 mx-auto d-flex"
					>
						Reject
					</Button>
				</Form.Group>
			</Modal.Body>
		</Modal>
	);
}
