const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = require("../db_local");

const createReviewer = (req, res) => {
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
};

module.exports = createReviewer;
