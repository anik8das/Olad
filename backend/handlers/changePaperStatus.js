const db = require("../db");

const changePaperStatus = (req, res) => {
	query = `UPDATE papers SET status = ${req.params.status} WHERE id = ${req.params.id};`;
	db.query(query, (err) => {
		if (err) {
			console.log("Error while changing status", err);
		} else {
			console.log(
				`changed status for paper ${req.params.id} to status ${req.params.status}`
			);
		}
		res.json({
			err: err,
		});
	});
};

module.exports = changePaperStatus;
