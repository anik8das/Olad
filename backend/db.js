const mysql = require("mysql");

const db = mysql.createConnection({
	host: process.env.HOSTNAME,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

module.exports = db;
