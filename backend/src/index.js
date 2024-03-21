const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.text());
app.use(cors());

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'qwerty',
    database:'giraffe'
})

app.post('/',async(req,res)=>{
    let query = req.body;
    console.log(query);
    connection.query(query,function(err,r,fields){
        if(err) throw err;
        res.send(r);
    })
})

app.get("/databases", async(req,res)=>{
    connection.query("SHOW DATABASES;", function(err, r, fields){
        if(err) throw err;
        res.send(r);
    })
})

app.listen(8000,async()=>{
    await connection.connect();
    console.log("Server is running on port",8000);
})