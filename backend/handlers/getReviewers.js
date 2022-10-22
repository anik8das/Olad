const mysql = require("mysql");

const db = require("../db");

const getReviewers = (req, res) => {
	const query = `SELECT * FROM reviewers`;
	db.query(query, async (err, result) => {
		if (err === null) {
			// now adding the interests for every reviewer
			for (let i = 0; i < result.length; i++) {
				const interestQuery = `SELECT interest FROM interests WHERE reviewer_id='${result[i].id}';`;
				db.query(interestQuery, (err, interestRes) => {
					if (err == null) {
						result[i].interests = interestRes;
					}
					if (i == result.length - 1) {
						// sending the result once the final reviewer's interests have been added
						res.json({
							err: err,
							reviewers: result,
						});
					}
				});
			}
		}
	});
};

module.exports = getReviewers;
