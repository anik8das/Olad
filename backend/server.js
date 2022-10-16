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

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	console.log("server requested");
});

app.post("/createJournal", (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, (_, hash) => {
		const query = `INSERT INTO journals (name, email, website, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.website}', '${hash}');`;
		db.query(query, (errDb, result) => {
			res.send(errDb);
		});
		console.log(`new journal created for email ${req.body.email}`);
	});
});

app.post("/createReviewer", (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, (_, hash) => {
		var query = `INSERT INTO reviewers (name, email, website, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.website}', '${hash}');`;
		db.query(query, (err, result) => {
			if (err === null) {
				console.log(`reviewer account created for ${req.body.email}`);
				var interestArr =
					req.body.interests.length > 0 ? req.body.interests.split(",") : [];
				for (const interest of interestArr) {
					query = `INSERT INTO interests (reviewer_id, interest) VALUES(${result.insertId}, '${interest}')`;
					db.query(query, (errInterest, resultInterest) => {
						if (errInterest != null) {
							res.json({
								err: errInterest,
								accountCreated: 1,
							});
						}
					});
				}
				res.json({
					err: err,
					accountCreated: 1,
				});
			} else {
				console.log(err);
				res.json({
					err: err,
					accountCreated: 0,
				});
			}
		});
	});
});

app.get("/login", (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
});

app.post("/login", (req, res) => {
	const table = req.body.journal ? "journals" : "reviewers";
	const query = `SELECT * FROM ${table} WHERE email = '${req.body.email}';`;
	db.query(query, (err, result) => {
		if (result.length > 0) {
			bcrypt.compare(
				req.body.password,
				result[0].password,
				(error, response) => {
					if (response) {
						req.session.user = result[0];
						console.log("session", req.session.user);
						res.send({
							err: err,
							accountExists: result.length,
							passwordCorrect: 1,
							accountDetails: result,
						});
					} else {
						res.send({
							err: err,
							accountExists: result.length,
							passwordCorrect: 0,
							accountDetails: result,
						});
					}
				}
			);
		} else {
			res.send({
				err: err,
				accountExists: result.length,
				accountDetails: result,
			});
		}
	});
});

app.get("/allPapersJournal/:id", (req, res) => {
	const query = `SELECT * FROM papers WHERE journal_id = '${req.params.id}';`;
	db.query(query, (err, result) => {
		console.log(err, result, req.body);
		res.json({
			err: err,
			papers: result,
		});
	});
	console.log(`all papers requested for journal id ${req.params.id}`);
});

app.post("/submitPaper", (req, res) => {
	var date = new Date();
	var dd = String(date.getDate()).padStart(2, "0");
	var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = date.getFullYear();
	req.body.doubleBlind = req.body.doubleBlind ? 1 : 0;
	req.body.openReview = req.body.openReview ? 1 : 0;

	const query = `INSERT INTO papers (title, journal_id, submission_date, link, double_blind, open_review, status) VALUES ('${
		req.body.title
	}', '${req.body.journal_id}', '${yyyy + mm + dd}', '${req.body.link}', '${
		req.body.doubleBlind
	}', '${req.body.openReview}', '0');`;
	db.query(query, (err, result) => {
		console.log("paper", err, result);
		res.send(err);
	});
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
