const e = require("express");
const db = require("../db_local");

const assignPaper = (req, res) => {
  var err = null;
  for (let reviewer of req.body.reviewers) {
    var query = `INSERT INTO matches (reviewer_id, paper_id) VALUES ('${reviewer}', '${req.params.id}');`;
    db.query(query, (errDb, result) => {
      if (errDb == null) {
        console.log(`Added reviewer ${reviewer} to paper ${req.params.id}`);
      } else {
        console.log(errDb);
        err = err == null ? errDb : err;
      }
    });
  }
  if (err == null) {
    var query = `UPDATE papers SET status = '1' WHERE id = ${req.params.id};`;
    db.query(query, (errDb, result) => {
      res.send(errDb);
    });
    console.log(`Reviewers assigned for paper id ${req.params.id}`);
  } else {
    res.send(err);
    console.log("Error encountered while matching papers", err);
  }
};

module.exports = assignPaper;
