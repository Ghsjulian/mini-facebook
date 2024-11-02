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
    async pushRequest(sender, name, email, avtar, target) {
        try {
            const targetUser = await UserModel.findOne({ _id: target });
            var connections = targetUser.connections;
            connections.push({
                status: "REQUEST",
                sender,
                reciver: target,
                name,
                email,
                avtar
            });
            const update = await UserModel.findOneAndUpdate(
                { _id: target },
                { connections }
            );
            if (update) {
                return true;
            }
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async sendNotification(user) {
        try {
            const newMessage = new NotificationModel(user);
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
    async getNotification(id) {
        try {
            const message = UserModel.findOne({ id });
        } catch (error) {
            console.log(error);
        }
    }
    async init(server) {
        this.io.attach(server);
        this.io.on("connection", socket => {
            socket.emit("__init__", socket.id);
            socket.on("new-user", userID => {
                console.log(`\n [+] New User Connected -> ${userID}\n`);
                this.users[userID] = this.getUser(userID);
                this.io.emit("get-new-user", this.users[userID]);
            });

            /*-----------------------------*
            +++----------------------------*
            +++----------------------------*
            +++------TESTING THE-----------*
            +++------SOCKET SERVER --------*
            +++------FOR CONNECTION--------*
            +++----------------------------*
            +++----------------------------*
            +++----------------------------*
            +++----------------------------*
            +++----------------------------*
            +++----------------------------*/
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
                            sender_id: fromUser._id,
                            reciver_id: toUser._id,
                            sender_name: fromUser.name,
                            sender_email: fromUser.email,
                            sender_avtar: fromUser.avtar,
                            message: `${fromUser.name} Has Sent You A Friend Request.`,
                            date: today
                        });
                        this.pushRequest(
                            from,
                            fromUser.name,
                            fromUser.email,
                            fromUser.avtar,
                            to
                        );
                        socket.emit("request-sent", true);
                    });
                });
            });
        });
    }
}

module.exports = new MyServer();
