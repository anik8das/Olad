const e = require("express");
const mysql = require("mysql");

const db = require("../db_local");

const getReviewers = (req, res) => {
	const query = `SELECT * FROM reviewers`;
	db.query(query, async (err, result) => {
		if (err === null) {
			// now adding the interests for every reviewer
			var filteredRes = [];
			for (let i = 0; i < result.length; i++) {
				var interestQuery = `SELECT interest FROM interests WHERE reviewer_id='${result[i].id}'`;
				db.query(interestQuery, (err, interestRes) => {
					if (
						err == null &&
						(req.params.interest == undefined ||
							interestRes.find(
								(item) => item.interest === req.params.interest
							))
					) {
						result[i].interests = interestRes;
						filteredRes.push(result[i]);
					}
					if (i == result.length - 1) {
						// sending the result once the final reviewer's interests have been added
						res.json({
							err: err,
							reviewers: filteredRes,
						});
					}
				});
			}
		}
	});
};

module.exports = getReviewers;
