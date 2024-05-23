const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    url: String,
    method: String,
    baseUrl: String,
    params: Object,
    query: Object,
    remoteAddress: String,
})

const Request = mongoose.model("request", requestSchema);

module.exports = Request