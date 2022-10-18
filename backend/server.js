const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const e = require("express");
require("dotenv").config();

const saltRounds = 10;
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

const app = express();
app.use(bodyParser.urlencoded({ encoded: true }));
app.use(cookieParser());
app.use(
	session({
		key: "userID",
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24,
		},
	})
);
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: ["http://localhost:3001"],
		methods: ["GET", "POST"],
		credentials: true,
	})
);
app.use(express.json());

app.get("/", (req, res) => {
	console.log("server requested");
});

app.get("/login", require('./handlers/getLogin'));

app.get("/getPapersJournal/:id/:status", require('./handlers/getPapersJournal'));

app.get("/getPendingPapers", (req, res) => {
	const query = `SELECT * FROM papers WHERE status = '0';`;
	db.query(query, (err, result) => {
		console.log('res', result)
		res.json({
			err: err,
			papers: result,
		});
	});
	console.log(`Pending papers requested`);
})

app.post("/createJournal", require('./handlers/createJournal'));

app.post("/createReviewer", require('./handlers/createReviewer'));

app.post("/login", require('./handlers/login'));

app.post("/submitPaper", require('./handlers/submitPaper'));

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
