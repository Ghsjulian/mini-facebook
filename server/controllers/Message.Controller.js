// Creating The User Controller Class Here...
// Requiring the modules here
const path = require("path");
const dotenv = require("dotenv").config("../../.env");
const UserModel = require("../models/User.Model");
const MessageModel = require("../models/Message.Model");
const ConversationModel = require("../models/Conversation.Model");
const Utils = require("../utils/Utils");
const { IO, users, getSocketID } = require("../sockets/socket");
const api = process.env.API;

class MessageController {
    async SendMessage(req, res) {
        const { message } = req.body;
        const sender_id = req.user._id;
        const receiver_id = req.params.receiver_id;
        try {
            const receiver = await UserModel.findOne({ _id: receiver_id });
            const sender = await UserModel.findOne({ _id: sender_id });
            if (receiver) {
                if (sender) {
                    let conversation = await ConversationModel.findOne({
                        participants: { $all: [sender_id, receiver_id] }
                    });
                    if (!conversation) {
                        conversation = await ConversationModel.create({
                            participants: [sender_id, receiver_id]
                        });
                    }
                    const newMessage = new MessageModel({
                        sender_id,
                        receiver_id,
                        sender_avatar: sender.avatar,
                        receiver_avatar: receiver.avatar,
                        message
                    });
                    if (newMessage) {
                        conversation.messages.push(newMessage._id);
                        await Promise.all([
                            conversation.save(),
                            newMessage.save()
                        ]);
                        /*--> For Get All Messages  <--*/
                        const socket_id = users[receiver_id]?.sock_id
                        console.log("Controller---> ", socket_id);
                        if (socket_id) {
                            // io.to(<socket_id>).emit() used to send events to specific client
                            IO.to(socket_id).emit(
                                "new_message",
                                newMessage
                            );
                        }
                        res.status(200).json(newMessage);
                    } else {
                        throw new Error("Failed To Send Message");
                    }
                } else {
                    throw new Error("Invalid Reciver ID");
                }
            } else {
                throw new Error("Invalid Reciver ID");
            }
        } catch (error) {
            res.status(404).json({
                code: 404,
                status: false,
                error: true,
                success: false,
                message: error.message || "Something Went Worng - 404"
            });
        }
    }
    async GetMessages(req, res) {
        try {
            const receiver_id = req.params.receiver_id;
            const sender_id = req.user._id;

            const conversation = await ConversationModel.findOne({
                participants: { $all: [sender_id, receiver_id] }
            }).populate("messages");

            if (!conversation) {
                return res.status(200).json([]);
            }
            const messages = conversation.messages;
            res.status(200).json(messages);
        } catch (error) {
            console.log("Error in GetMessages.Controller : ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = new MessageController();
