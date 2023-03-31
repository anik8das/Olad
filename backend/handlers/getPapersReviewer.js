const e = require("express");
const db = require("../db");

const getPapersReviewer = (req, res) => {
	var query = `SELECT paper_id FROM matches WHERE reviewer_id = '${req.params.id}'`;
	query += req.params.status == "" ? ";" : `AND status=${req.params.status};`;
	db.query(query, (err, result) => {
		if (err == null) {
			if (result.length == 0) {
				// if no papers exist, the next SQL statement will throw an error
				res.json({
					err: err,
					papers: result,
				});
			} else {
				var paperIds = result
					.map((item) => item.paper_id)
					.join(",")
					.toString();
				query = `SELECT * FROM papers WHERE id IN (${paperIds});`;
				db.query(query, (err, result) => {
					res.json({
						err: err,
						papers: result,
					});
				});
			}
		} else {
			res.json({
				err: err,
			});
		}
	});
	console.log(`all papers requested for reviewerId ${req.params.id}`);
};

module.exports = getPapersReviewer;
