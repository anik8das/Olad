import React from "react";

export default function Homepage() {
	return (
		<div
			className="text-center position-relative"
			style={{
				backgroundImage: "url(/homeBg.jpg)",
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
				height: "92%",
			}}
		>
			<div className="text-light fw-lighter w-100 fs-1 bg-black p-5 position-absolute top-50 start-50 translate-middle bg-opacity-75">
				Welcome to the future of peer-review.
			</div>
		</div>
	);
}
