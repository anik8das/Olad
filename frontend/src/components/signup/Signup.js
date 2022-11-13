import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import SignupJournal from "./SignupJournal";
import SignupReviewer from "./SignupReviewer";

export default function Signup() {
	const [journalToggle, setJournalToggle] = useState(0);
	return (
		<Container className="w-50 mt-5 mb-5">
			<ButtonGroup className="mb-3">
				<ToggleButton
					key={0}
					type="radio"
					variant="secondary"
					checked={journalToggle === 0}
					onClick={() => setJournalToggle(0)}
				>
					Journal
				</ToggleButton>
				<ToggleButton
					key={1}
					type="radio"
					variant="secondary"
					checked={journalToggle === 1}
					onClick={() => setJournalToggle(1)}
				>
					Reviewer
				</ToggleButton>
			</ButtonGroup>
			{journalToggle === 0 && <SignupJournal />}
			{journalToggle === 1 && <SignupReviewer />}
		</Container>
	);
}
