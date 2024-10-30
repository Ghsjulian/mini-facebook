const socketIO = require("socket.io");

class MyServer {
    constructor() {
        this.io = socketIO();
        this.activeUsers = [];
        this.users = {};
    }
    init(server) {
        this.io.attach(server);
        this.io.on("connection", socket => {
            socket.emit("__init__", socket.id);
            socket.on("createConnection", user => {
                this.users[user.user_id] = user;
                console.log(`\n [+] New User Connected -> ${user.user_id}\n`);
                console.log(this.users);
            });
        });
    }
}

module.exports = new MyServer();
