const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = require("../db_local");

const getInterests = (req, res) => {
  const query = `SELECT DISTINCT interest FROM interests;`;
  db.query(query, (err, result) => {
    res.json({
      err: err,
      interests: result.map((res) => res.interest),
    });
  });
  console.log(`all interests requested`);
};

module.exports = getInterests;
