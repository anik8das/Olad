const db = require("../db_local");

const changeReviewerStatus = (req, res) => {
	// 0 would imply deletion of this reviewer from the matches table (can only called by Admin)
	query = "";
	console.log(
		`Change reviewer status called from reviewer ${req.params.reviewer_id} for paper ${req.params.paper_id} to status ${req.params.status}`
	);
	if (req.params.status == 0) {
		query = `DELETE FROM matches WHERE paper_id = ${req.params.paper_id} AND reviewer_id = ${req.params.reviewer_id};`;
	} else if (req.params.status == 2) {
		console.log(`Reason given is ${req.body.reason}`);
		req.body.reason = req.body.reason.replace(`'`, `''`); // handling single quotes, otherwise would throw an SQL syntax error
		query = `UPDATE matches
        SET status = ${req.params.status}, rejection_reason = "${req.body.reason}"
        WHERE paper_id = ${req.params.paper_id} AND reviewer_id = ${req.params.reviewer_id};`;
	} else {
		query = `UPDATE matches
        SET status = ${req.params.status}
        WHERE paper_id = ${req.params.paper_id} AND reviewer_id = ${req.params.reviewer_id};`;
	}
	db.query(query, (err) => {
		if (err) {
			console.log("Error while changing status", err);
		} else {
			console.log(
				`changed status for reviewer ${req.params.reviewer_id} on paper ${req.params.paper_id} to status ${req.params.status}`
			);
		}
		res.json({
			err: err,
		});
	});
};

module.exports = changeReviewerStatus;
