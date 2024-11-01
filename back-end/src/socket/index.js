const socketIO = require("socket.io");
const UserModel = require("../models/UserModel");
const NotificationModel = require("../models/NotificationModel");

class MyServer {
    constructor() {
        this.io = socketIO();
        this.activeUsers = [];
        this.users = {};
    }
    async getUser(id) {
        try {
            const user = await UserModel.findOne({ _id: id });
            if (user) {
                return user;
            } else {
                throw new Error("No user found");
            }
        } catch (error) {
            return error;
        }
    }
    async sendNotification(user) {
        try {
            const newMessage = new NotificationModel({
                from: user.from,
                to: user.to,
                sender_name: user.name,
                sender_email: user.email,
                sender_avtar: user.avtar,
                message: user.message,
                date: user.date
            });
            const send = await newMessage.save();
            if (send) {
                return true;
            } else {
                throw new Error();
            }
        } catch (error) {
            return error.message;
        }
    }

    async init(server) {
        this.io.attach(server);
        this.io.on("connection", socket => {
            console.log("connected....");
            socket.emit("__init__", socket.id);
            socket.on("createConnection", user => {
                this.users[user.user_id] = user;
                console.log(`\n [+] New User Connected -> ${user.user_id}\n`);
                console.log(this.users);
            });
            socket.on("add-friend", (from, to) => {
                this.getUser(from).then(fromUser => {
                    this.getUser(to).then(toUser => {
                        var date = new Date();
                        const today = date.toDateString();
                         this.sendNotification({
                            from: {
                                id: fromUser._id,
                                name: fromUser.name,
                                email: fromUser.email,
                                avtar: fromUser.avtar
                            },
                            to: {
                                id: toUser._id,
                                name: toUser.name,
                                email: toUser.email,
                                avtar: toUser.avtar
                            },
                            sender_name: fromUser.name,
                            sender_email: fromUser.email,
                            sender_avtar: fromUser.avtar,
                            message: `${fromUser.name} Has Sent You A Friend Request.`,
                            date: today
                        });
                        socket.emit("request-sent",true)
                    });
                });
            });
        });
    }
}

module.exports = new MyServer();
