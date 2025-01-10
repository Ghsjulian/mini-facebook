const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
// Required Modules
const UserModel = require("../models/User.Model");
const Utils = require("../utils/Utils");

const users = {};
const totalFriends = [];

const getSocketID = id => {
    if (users?.id) {
        console.log("socket.js --> ", users[id]);
        return users[id].sock_id;
    }
    return;
};

const getStatus = async id => {
    try {
        const user = await UserModel.findById(id).select("-password");
        if (user) {
            return user;
        } else {
            throw new Error();
        }
    } catch (e) {
        return false;
    }
};

const IO = new Server(server, {
    cors: {
        origin: ["http://localhost:5000","https://mini-facebook-wrdw.onrender.com"],
        method: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Create Socket Connection
IO.on("connection", async socket => {
    /*--> Create Handshake <--*/
    const user_id = socket.handshake.query.user_id;
    const user = await Utils.getUser(user_id);
    console.log(`\n [+] ---> ${user.name} Has Connected\n`);

    if (user_id != "undefined") {
        users[user_id] = {
            sock_id: socket.id,
            user_id,
            user_name: user.name,
            user_avatar: user.avatar,
            user_friends: user.friends
        };
    }
    /*--> Extract Friends From Random Users <--*/

    const keys = Object.keys(users);
    const update = await UserModel.findByIdAndUpdate(user_id, {
        online: true
    });
    const friends = await Utils.getFriends(user_id);
    if (friends.length !== 0) {
        friends?.forEach(async item => {
            totalFriends.push(await getStatus(item?.id));
        });
    }
    console.log(totalFriends);
    IO.emit("active-users", totalFriends);
    /*
    if (await Utils.isFriend(user_id)) {
        IO.to(users[user_id].sock_id).emit("active_users", users);
    }
    */
    // }

    /*--> For Disonnecting User <--*/
    socket.on("disconnect", async socket => {
        const keys = Object.keys(users);
        const update = await UserModel.findByIdAndUpdate(user_id, {
            online: false
        });
        const friends = await Utils.getFriends(user_id);
        if (friends.length !== 0) {
            friends?.forEach(async item => {
                totalFriends.push(await getStatus(item?.id));
            });
        }
        // console.log(totalFriends);
        IO.emit("active-users", totalFriends);
        delete users[user_id];
        console.log(`\n [-] ---> ${user.name} Has Disonnected\n`);
    });
});

// Export All
module.exports = { app, server, IO, users, getSocketID };
