const mysql = require("mysql");
const upload = require("../google_drive/upload");
const db = require("../db_local");

const submitPaper = async (req, res) => {
	var date = new Date();
	var dd = String(date.getDate()).padStart(2, "0");
	var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = date.getFullYear();
	req.body.doubleBlind = req.body.doubleBlind ? 1 : 0;
	req.body.openReview = req.body.openReview ? 1 : 0;
	if (req.files != undefined) {
		req.body.link = await upload(req.files.file.name, req.files.file);
	}
	const query = `INSERT INTO papers (title, journal_id, submission_date, link, double_blind, open_review, status) VALUES ('${
		req.body.title
	}', '${req.body.journal_id}', '${yyyy + mm + dd}', '${req.body.link}', '${
		req.body.doubleBlind
	}', '${req.body.openReview}', '0');`;
	db.query(query, (err, result) => {
		res.send(err);
	});
};

module.exports = submitPaper;
