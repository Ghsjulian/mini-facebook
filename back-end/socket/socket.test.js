// index.js (Node.js server)
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const PORT = 4000;
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000", // Update this to your client URL
        methods: ["GET", "POST"]
    }
});

let users = {}; // Store users and their socket IDs

io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    // Handle new user connection
    socket.on('newUser ', (userName) => {
        users[socket.id] = userName; // Store the user with their socket ID
        io.emit('activeUsers', Object.values(users)); // Emit active users to all clients
    });

    // Handle private message
    socket.on('privateMessage', ({ recipientId, message }) => {
        socket.to(recipientId).emit('receiveMessage', {
            message,
            sender: users[socket.id]
        });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        delete users[socket.id]; // Remove user from the list
        io.emit('activeUsers', Object.values(users)); // Update active users
        console.log('🔥: A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});