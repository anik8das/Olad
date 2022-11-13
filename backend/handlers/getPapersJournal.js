const db = require("../db_local");

const getAllPapersJournal = (req, res) => {
	var query = `SELECT * FROM papers WHERE journal_id = '${req.params.id}'`;
	if (req.params.status == -1) {
		query += ";";
	} else {
		query += `AND status = '${req.params.status}';`;
	}
	db.query(query, (err, result) => {
		res.json({
			err: err,
			papers: result,
		});
	});
	console.log(`all papers requested for journal id ${req.params.id}`);
};

module.exports = getAllPapersJournal;
