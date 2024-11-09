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
            type: String,
            default: ""
        },
        password: {
            type: String,
            required: true
        },
        friends: {
            type: Array,
            default: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            ]
        },
        token: {
            type: String
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;