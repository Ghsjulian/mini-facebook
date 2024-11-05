const socketIo = require("socket.io");
const express = require("express");
const app = express();
const server = require("http").createServer(app);

const activeUsers = {};
var IO = socketIo();
IO.attach(server);

IO.on("connection", socket => {
    socket.on("connect-user", user => {
        activeUsers[user.id] = socket.id;
        IO.emit("active-users", Object.keys(activeUsers));
        console.log("\n[+] User Has Connected ---> ", user.id);
    });
    // DISCONNECTED CODES
    socket.on("disconnect", () => {
        //   console.log("User disconnected:", socket.id);
    });
});

const sendNotification = async (socketId, message) => {
    const socket = IO.sockets.sockets.get(socketId);
    if (socket) {
        socket.emit("send-notification", message); // Emit the message to the specific user
    } else {
        console.log(`User with socket ID ${socketId} not found.`);
    }
};

module.exports = { app, server, IO, sendNotification };

/*-----------------------------*/
/*
class MyServer {
    constructor() {
        this.io = socketIo();
        this.activeUsers = [];
        this.users = {};
    }

    async init(server) {
        this.io.attach(server);
        this.io.on("connection", socket => {
            console.log("Connected...");
            // disconnected codes
            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }

    // Method to get the io instance
    getIo() {
        return this.io;
    }

    // Method to get active users
    getActiveUsers() {
        return Object.values(this.activeUsers); // Return an array of active users
    }

    // Method to remove a user
    removeUser(socketId) {
        delete this.activeUsers[socketId]; // Remove the user from the active users list
    }

    // Method to send a message to a specific user
    sendMessageToUser(socketId, message) {
        const socket = this.io.sockets.sockets.get(socketId);
        if (socket) {
            socket.emit("privateMessage", message); // Emit the message to the specific user
        } else {
            console.log(`User with socket ID ${socketId} not found.`);
        }
    }
}
*/
