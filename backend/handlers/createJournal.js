const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = require("../db");

const createJournal = (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, (_, hash) => {
		const query = `INSERT INTO journals (name, email, website, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.website}', '${hash}');`;
		db.query(query, (errDb, result) => {
			res.send(errDb);
		});
		console.log(`new journal created for email ${req.body.email}`);
	});
};

module.exports = createJournal;
