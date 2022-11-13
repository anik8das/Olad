import React from "react";
import { Modal } from "react-bootstrap";

export default function AlertModal(props) {
	return (
		<Modal
			show={props.showVariable}
			onHide={() => {
				props.changeVariable(false);
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.body}</Modal.Body>
		</Modal>
	);
}
