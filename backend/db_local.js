const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: process.env.PASSWORD_LOCAL,
	database: process.env.DATABASE_LOCAL,
});

module.exports = db;
