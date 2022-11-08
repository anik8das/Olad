const e = require("express");
const db = require("../db_local");

const getPaperInfo = (req, res) => {
	var query = `SELECT * FROM papers WHERE id = '${req.params.id}';`;
	db.query(query, (err, result) => {
		if (err == null) {
			console.log('res',result)
			query = `SELECT * FROM matches WHERE paper_id='${req.params.id}'`;
			db.query(query, (err, matches) => {
				console.log('matches', matches, req.params.id)
				res.json({
					err: err,
					matches: matches,
					paper: result[0]
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

module.exports = getPaperInfo;
