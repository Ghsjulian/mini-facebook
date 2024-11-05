const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    sender: String,
    reciver: String,
},{timestamp:true});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
