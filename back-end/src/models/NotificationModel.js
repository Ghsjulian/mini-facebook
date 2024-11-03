const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    sender_id : String,
    reciver_id : String,
    sender_name: String,
    sender_email: String,
    sender_avtar: String,
    message: String
},{timestamp:true});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
