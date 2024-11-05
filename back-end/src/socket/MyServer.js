const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

class MyServer {
    constructor() {
        if (!MyServer.instance) {
            this.app = express();
            this.server = http.createServer(this.app);
            this.io = socketIo(this.server); // Initialize Socket.IO with the server
            this.activeUsers = {}; // Store active users with their socket IDs
            this.init();
            MyServer.instance = this; // Store the instance
        }
        return MyServer.instance; // Return the existing instance
    }

    init() {
        this.io.on("connection", socket => {
            console.log("A user connected:", socket.id);
            // Store user information
            this.activeUsers[socket.id] = {
                id: socket.id /* other user data can go here */
            };
            socket.on("disconnect", () => {
                console.log("User  disconnected:", socket.id);
                this.removeUser(socket.id);
                // Emit the updated list of users (optional)
                this.io.emit("userListUpdated", this.getActiveUsers());
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
            console.log(`User  with socket ID ${socketId} not found.`);
        }
    }

    // Method to start the server
    start(port) {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

// Export the MyServer instance
const instance = new MyServer();
Object.freeze(instance); // Prevent modification
module.exports = instance;
