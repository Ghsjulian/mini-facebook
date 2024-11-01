const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    from: Object,
    to: Object,
    sender_name: String,
    sender_email: String,
    sender_avtar: String,
    message: String,
    date: String
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
