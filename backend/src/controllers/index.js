const mysql = require('mysql2');

let connection;

const controls = {}

controls.connect = async (req,res) => {
    const connData = req.body;
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

controls.queries = async (req,res) => {
    console.log(connection, 'connection info')
    let query = req.body;
    console.log(query);
    connection?.query(query,function(err,r,fields){ // field is column definition of the table
        if(err) throw err;
        res.send(r);
    })
}

controls.datatables = async (req,res) => {
    connection?.query("SHOW DATABASES;", async function(err, r, fields){ 
        if(err) throw err;
        connection?.query("SHOW TABLES;", function(err, tables, fields){
            if(err) throw err;
            console.log(tables,"show tables response");
            res.send({database: r, tables});
        })
        // console.log("table changed to " + r);
    })
}

controls.createDatabase = async (req,res) => {
    let db = req.body;
    connection?.query(`CREATE DATABASE ${db};`, function(err,r,fields){
        if(err) throw err;
        res.send("Database created successfully");
    })
}

controls.changeDatabase = async (req,res) => {
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
}

module.exports = controls;