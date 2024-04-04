const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const defaultConfig = require("./../config/defaults.json");

const app = express();
const port = defaultConfig.development.port;

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

app.post("/changedatabase", async(req,res)=>{
    let query = req.body;
    console.log(`use ${query};`, "-------query -----------");
    connection.query(`use ${query};`, function(err,r,fields){
        if(err) throw err;
        res.send(r);
    })
})

app.listen(port,async()=>{
    await connection.connect();
    console.log("Server is running on port",port);
})