const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
require('dotenv').config();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yoyohone',
    database: 'PRAASDB'
})

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    const temp = "INSERT INTO Journals (journal_id, journal_name) VALUES (2, 'aik');"
    db.query(temp, (err, result) => {
        console.log(result)
        res.send(err)
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
