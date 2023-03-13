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
					We're a third-party organization focussed exclusively on
					peer-review and fully responsible for it — from selecting
					eligible reviewers to sending back a completely annotated
					and professionally formatted paper back to journals. We have
					a pool of trained scientists and researchers. Efficiency and
					accuracy is enhanced by utilizing a annotation-based
					collaborative software for the reviewing process. Quality is
					ensured by maintaining a reviewer index and randomized audit
					checks. Lastly, but most importantly, we allow journals to
					focus on their core value proposition: selectivity,
					curation, and a robust submission and feedback system.
				</div>
				<div className="h1 mb-4">Why does it work?</div>
				<div className="fs-5 fw-light mb-5">
					Centralization leads to a plethora of benefits. Training and
					collaboration ensures consistency and standardization.
					Forced double blinding removes any potential for biases. A
					concentrated single pool of reviewers results in faster and
					better matches. We also maintain a financial pool to help
					financially need reviewers and reduce demographic bias in
					the peer-review process. Eliminating personal relationships
					between authors, reviewers, and journals helps cut
					corruption and biases. Lastly, it frees up resources for
					journals to focus on buiilding better systems for accepting
					and maintaining papers.
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
