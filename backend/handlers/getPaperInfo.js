const e = require("express");
const db = require("../db");

const getPaperInfo = (req, res) => {
	var query = `SELECT * FROM papers WHERE id = '${req.params.id}';`;
	db.query(query, (err, result) => {
		if (err == null) {
			query = `SELECT * FROM matches WHERE paper_id='${req.params.id}';`;
			db.query(query, (err, matches) => {
				if (err == null) {
					query = `SELECT name FROM journals WHERE id='${result[0].journal_id}';`;
					db.query(query, (err, name) => {
						console.log(result[0]);
						result[0].journal_name = name[0].name;
						res.json({
							err: err,
							matches: matches,
							paper: result[0],
						});
					});
				} else {
					res.json({
						err: err,
					});
				}
			});
		} else {
			res.json({
				err: err,
			});
		}
	});
	console.log(`all papers requested for reviewerId ${req.params.id}`);
};

module.exports = getPaperInfo;
