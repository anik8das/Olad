const mysql = require("mysql");
const bcrypt = require("bcrypt");

const db = require("../db_local");

const login = (req, res) => {
  const table = req.body.journal ? "journals" : "reviewers";
  const query = `SELECT * FROM ${table} WHERE email = '${req.body.email}';`;
  db.query(query, (err, result) => {
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password,
        result[0].password,
        (error, response) => {
          if (response) {
            req.session.user = {};
            req.session.user.info = result[0];
            req.session.user.role = req.body.journal;
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
};

module.exports = login;
