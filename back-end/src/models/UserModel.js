const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: String,
    avtar: String,
    connections : Array,
    token: String,
    type: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
