require('module-alias/register');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const defaultConfig = require("@config/defaults.json");
const Sequelize = require("sequelize");

const app = express();
const port = defaultConfig.development.port;

app.use(express.text());
app.use(express.json());
app.use(cors());
let connection;
// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'qwerty',
//     database:'giraffe'
// })

const executeQuery = async (query) => {
    return connection.execute(query);
}

const connectSequelize = async ({database,username,password}) => {
    return new Sequelize(database,username,password, {
        host: "localhost",
        dialect: "postgres"
    })
}

app.post("/connect", async (req,res)=>{
    const connData = req.body;
    console.log(connData, '-----conn data-------');
    try {
        if(connData && connData.username && connData.password) {
            connection =  mysql.createConnection({
                host:"localhost",
                user: connData.username,
                password: connData.password,
                database: connData.database
            })
            await connection.connect();
            res.send("Connection successful");
        }
    }
    catch(err) {
        console.log(err, "error while connecting")
    }
})

app.post('/',async(req,res)=>{
    console.log(connection, 'connection info')
    let query = req.body;
    console.log(query);
    connection?.query(query,function(err,r,fields){ // field is column definition of the table
        if(err) throw err;
        res.send(r);
    })
})

app.get("/databases", async(req,res)=>{
    connection?.query("SHOW DATABASES;", async function(err, r, fields){ 
        if(err) throw err;
        connection?.query("SHOW TABLES;", function(err, tables, fields){
            if(err) throw err;
            console.log(tables,"show tables response");
            res.send({database: r, tables});
        })
        // console.log("table changed to " + r);
    })
})

app.post("/createdatabase", async(req,res)=>{
    let db = req.body;
    connection?.query(`CREATE DATABASE ${db};`, function(err,r,fields){
        if(err) throw err;
        res.send("Database created successfully");
    })
})

app.post("/changedatabase", async(req,res)=>{
    let query = req.body;
    connection?.query(`use ${query};`, function(err,r,fields){
        if(err) throw err;
        connection?.query("SHOW TABLES;", function(err, tables, fields){
            if(err) throw err;
            console.log(tables,"show tables response");
            res.send({database: r, tables});
        })
        console.log("table changed to " + r);
    })
})

app.post("/showtables", async(req,res)=>{

})

app.listen(port,async()=>{
    // await connection.connect();
    console.log("Server is running on port",port);
})