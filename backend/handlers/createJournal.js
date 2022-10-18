const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

const createJournal = (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, (_, hash) => {
		const query = `INSERT INTO journals (name, email, website, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.website}', '${hash}');`;
		db.query(query, (errDb, result) => {
			res.send(errDb);
		});
		console.log(`new journal created for email ${req.body.email}`);
	});
}

module.exports = createJournal;