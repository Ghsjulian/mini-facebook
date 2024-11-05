const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    userOne: String,
    userTwo: String,
},{timestamp:true});

const Friends = mongoose.model("Friend", friendSchema);

module.exports = Friends;
