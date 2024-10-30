const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

class ChatServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server);
        this.activeUsers = {};
    }

    init() {
        this.app.get("/", (req, res) => {
            res.sendFile(__dirname + "/index.html");
        });

        this.io.on("connection", (socket) => {
            console.log(`User  connected: ${socket.id}`);

            // Handle user joining
            socket.on("join", (username) => {
                this.addUser (socket.id, username);
                this.io.emit("activeUsers", Object.values(this.activeUsers)); // Broadcast updated user list
            });

            // Handle incoming messages
            socket.on("private message", ({ recipientId, msg }) => {
                // Send message to specific user
                this.io.to(recipientId).emit("private message", {
                    from: socket.id,
                    msg: msg,
                });
            });

            // Handle user disconnecting
            socket.on("disconnect", () => {
                this.removeUser (socket.id);
                this.io.emit("activeUsers", Object.values(this.activeUsers)); // Broadcast updated user list
                console.log(`User  disconnected: ${socket.id}`);
            });
        });

        this.server.listen(3000, () => {
            console.log("Server is listening on port 3000");
        });
    }

    addUser (socketId, username) {
        this.activeUsers[socketId] = username;
    }

    removeUser (socketId) {
        delete this.activeUsers[socketId];
    }
}

const chatServer = new ChatServer();
chatServer.init();