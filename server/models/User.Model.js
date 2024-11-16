const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        avatar: {
            type: String
        },
        cover: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        notifications: {
            type: [
                {
                    sender_name: String,
                    sender_id: String,
                    receiver_id: String,
                    sender_avatar: String
                }
            ]
        },
        requests: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            ]
        },
        friends: {
            type: [{
                id: String,
                                    name: String,
                                    avatar: String 
            }]
        },
        token: {
            type: String
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
