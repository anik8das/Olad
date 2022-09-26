const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const e = require('express');
require('dotenv').config();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yoyohone',
    database: 'PRAASDB'
})

const app = express();
app.use(bodyParser.urlencoded({encoded: true}))
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    console.log('server requested')
})

app.post('/createJournal', (req,res)=>{
    const query = `INSERT INTO journals (name, email, website, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.website}', '${req.body.password}');`
    db.query(query, (err, result) => {
        res.send(err)
    })
})

app.post('/createReviewer', (req,res)=>{
    var query = `INSERT INTO reviewers (name, email, website, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.website}', '${req.body.password}');`
    db.query(query, (err, result) => {
        if(err === null) {
            var interestArr = req.body.interests.length>0? req.body.interests.split(','): [];
            for (const interest of interestArr) {
                query = `INSERT INTO interests (reviewer_id, interest) VALUES(${result.insertId}, '${interest}')`
                db.query(query, (errInterest, resultInterest) => {
                    if(errInterest != null) {
                        res.json({
                            'err': errInterest,
                            'accountCreated': 1
                        })
                    }
                })
            }
            res.json({
                'err': err,
                'accountCreated': 1
            })
        }
        else {
            res.json({
                'err': err,
                'accountCreated': 0
            })
        }
    })
})

app.post('/login', (req,res)=>{
    const table = req.body.journal? 'journals': 'reviewers';
    const query = `SELECT * FROM ${table} WHERE email = '${req.body.email}' AND password = '${req.body.password}';`
    db.query(query, (err, result) => {
        console.log(result.length, err)
        res.json({
            'err': err,
            'accountCreated': result.length
        })
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
