require('module-alias/register');
const express = require('express');
const cors = require('cors');
const defaultConfig = require("@config/defaults.json");
const Sequelize = require("sequelize");
const controls = require('./controllers');
const morgan = require("morgan");
const mongoose = require("mongoose");
const Request = require("./models/requests");


const app = express();
const port = defaultConfig.development.port;
const mongoURL = defaultConfig.development.mongoURL;


app.use(morgan("combined"));
app.use(express.text());
app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
    console.log(Object.keys(req),'req object');
    const request = new Request({
        url: req.url,
        method: req.method,
        params: req.params,
        query: req.query,
        remoteAddress: req._remoteAddress,
        baseUrl: req.baseUrl
    });

    request.save();

    next();
})

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

app.listen(port,async()=>{
    await mongoose.connect(mongoURL);
    console.log("Server is running on port",port);
})