const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

const getAllPapersJournal = (req, res) => {
	const query = `SELECT * FROM papers WHERE journal_id = '${req.params.id}';`;
	db.query(query, (err, result) => {
		res.json({
			err: err,
			papers: result,
		});
	});
	console.log(`all papers requested for journal id ${req.params.id}`);
}

module.exports = getAllPapersJournal;