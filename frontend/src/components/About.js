import React from "react";
import Container from "react-bootstrap/Container";

export default function About() {
	return (
		<div
			style={{
				backgroundImage: "url(/aboutBg.jpg)",
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
			}}
		>
			<Container className="w-50 pt-5 pb-5">
				<div className="h1 mb-4">About Us</div>
				<div className="fs-5 fw-light mb-5">
					A third-party organization or mechanism, focussed
					exclusively on peer-review and fully responsible for it —
					from selecting eligible reviewers to sending back a
					completely annotated paper back to the journal. The process
					overview is described in Figure 2. It will recruit trained
					scientists, provide training to the inexperienced ones,
					utilize a Skepsi-like software for the reviewing process,
					match papers to relevant reviewers, pay them the fee after
					deducting administrative costs, conduct randomized quality
					control checks, maintain a reviewer index for reliability
					statistics, and allow the author as well as the editor to
					contribute or clarify during the process.
				</div>
				<div className="h1 mb-4">Why does it work?</div>
				<div className="fs-5 fw-light mb-5">
					A third-party organization or mechanism, focussed
					exclusively on peer-review and fully responsible for it —
					from selecting eligible reviewers to sending back a
					completely annotated paper back to the journal. The process
					overview is described in Figure 2. It will recruit trained
					scientists, provide training to the inexperienced ones,
					utilize a Skepsi-like software for the reviewing process,
					match papers to relevant reviewers, pay them the fee after
					deducting administrative costs, conduct randomized quality
					control checks, maintain a reviewer index for reliability
					statistics, and allow the author as well as the editor to
					contribute or clarify during the process.
				</div>
				<div className="h1 mb-4">Learn more</div>
				<div className="fs-5 fw-light">
					Read our white paper{" "}
					<a
						className="text-dark"
						href="https://anik8das.medium.com/peer-review-as-a-service-a-potential-gamechanger-for-science-4989763adcf6"
					>
						here
					</a>{" "}
					which outlines the complete problem statement, our solution
					formation with detailed justification, and addressal of
					counter-arguments. For additional follow-ups, please contact
					us at aniketdas001@gmail.com
				</div>
			</Container>
		</div>
	);
}
