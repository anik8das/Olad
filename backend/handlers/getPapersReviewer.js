const e = require("express");
const db = require("../db_local");

const getAllPapersReviewer = (req, res) => {
	var query = `SELECT paper_id FROM matches WHERE reviewer_id = '${req.params.id}';`;
	db.query(query, (err, result) => {
		if (err == null) {
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
		else {
			res.json({
				err: err
			})
		}
	});
	console.log(`all papers requested for reviewerId ${req.params.id}`);
};

module.exports = getAllPapersReviewer;
