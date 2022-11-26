const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const db = require("./db_local");

const app = express();
app.use(bodyParser.urlencoded({ encoded: true }));
app.use(fileUpload());
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
	res.send("Hello there!");
});

app.get("/login", require("./handlers/getLogin"));

app.get("/logout", require("./handlers/logout"));

app.get(
	"/getPapersJournal/:id/:status",
	require("./handlers/getPapersJournal")
);

app.get(
	"/getPapersReviewer/:id/:status?",
	require("./handlers/getPapersReviewer")
);

app.get("/getPaperInfo/:id", require("./handlers/getPaperInfo"));

app.get("/getPapersAdmin/:status", (req, res) => {
	const query = `SELECT * FROM papers WHERE status = '${req.params.status}';`;
	db.query(query, (err, result) => {
		res.json({
			err: err,
			papers: result,
		});
	});
	console.log(`Pending papers requested`);
});

app.get("/getReviewers/:interest?", require("./handlers/getReviewers"));

app.get("/getInterests", require("./handlers/getInterests"));

app.post("/assignPaper/:id", require("./handlers/assignPapers"));

app.post("/createJournal", require("./handlers/createJournal"));

app.post("/createReviewer", require("./handlers/createReviewer"));

app.post("/login", require("./handlers/login"));

app.post("/loginAdmin", require("./handlers/loginAdmin"));

app.post("/submitPaper", require("./handlers/submitPaper"));

app.post(
	"/changeReviewerStatus/:paper_id/:reviewer_id/:status",
	require("./handlers/changeReviewerStatus")
);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
