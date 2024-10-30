
const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const recipientSelect = document.getElementById("recipient");

// Prompt for username
const username = prompt("Enter your username:");
socket.emit("join", username);
socket.on("connection");
// Update active users
socket.on("activeUsers", function (users) {
    recipientSelect.innerHTML = '<option value="">Select recipient</option>'; // Reset the select
    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user.socketId; // Assuming you have a way to get the socket ID
        option.textContent = user.username; // Display the username
        recipientSelect.appendChild(option);
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const recipientId = recipientSelect.value;
    if (input.value && recipientId) {
        socket.emit("private message", {
            recipientId: recipientId,
            msg: input.value
        });
        input.value = "";
    }
});

socket.on("private message", function ({ from, msg }) {
    const item = document.createElement("li");
    item.textContent = `From ${from}: ${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
