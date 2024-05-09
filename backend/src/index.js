require('module-alias/register');
const express = require('express');
const cors = require('cors');
const defaultConfig = require("@config/defaults.json");
const Sequelize = require("sequelize");
const controls = require('./controllers');

const app = express();
const port = defaultConfig.development.port;

app.use(express.text());
app.use(express.json());
app.use(cors());
// export let connection;
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
    try {
        await controls.connect(req,res);
    }
    catch(err) {
        console.log(err, "error while connecting")
    }
})

app.post('/',async(req,res)=>{
    try {
        await controls.queries(req,res);
    }
    catch(err) {
        console.log(err, "Error in queries");
    }
})

app.get("/databases", async(req,res)=>{
    try {
        await controls.datatables(req,res);
    }
    catch(err) {
        console.log(err, "Error in getting tables from database");
    }
})

app.post("/createdatabase", async(req,res)=>{
    try {
        await controls.createDatabase(req,res);
    }
    catch(err) {
        console.log(err, "Error in creating database");
    }
})

app.post("/changedatabase", async(req,res)=>{
    try {
        await controls.changeDatabase(req,res);
    }
    catch(err) {
        console.log(err, "Error in changing database");
    }
})

// app.post("/showtables", async(req,res)=>{

// })

app.listen(port,async()=>{
    // await connection.connect();
    console.log("Server is running on port",port);
})