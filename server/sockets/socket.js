const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
// Required Modules
const Utils = require("../utils/Utils");

const users = {};

const getSocketID = id => {
    if (users?.id) {
        console.log("socket.js --> ",users[id]);
        return users[id].sock_id;
    }
    return;
};

const IO = new Server(server, {
    cors: {
        origin: ["http://localhost:5000"],
        method: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Create Socket Connection
IO.on("connection", async socket => {
    /*--> Create Handshake <--*/
    const user_id = socket.handshake.query.user_id;
    const user = await Utils.getUser(user_id);
    if (user_id != "undefined") {
        users[user_id] = {
            sock_id: socket.id,
            user_id,
            user_name: user.name,
            user_avatar: user.avatar,
            user_friends: user.friends
        };
        /*--> Extract Friends From Random Users <--*/
        let friends = [];
        Object.keys(users).forEach(u_id => {
            let result = user.friends.find(obj => obj?.id === u_id);
            if (result?.id) {
                friends.push(users[result.id]);
            }
        });
        IO.emit("active_users", friends);
        //IO.to(users[user_id].sock_id).emit("active_users", friends);
        /*
    if (await Utils.isFriend(user_id)) {
        IO.to(users[user_id].sock_id).emit("active_users", users);
    }
    */
    }
    console.log(`\n [+] ---> ${user.name} Has Connected\n`);
    /*--> For Disonnecting User <--*/
    socket.on("disconnect", async socket => {
        delete users[user_id];
        console.log(`\n [-] ---> ${user.name} Has Disonnected\n`);
    });
});

// Export All
module.exports = { app, server, IO,users, getSocketID };
