const User = require("../models/UserModel");
const Friend = require("../models/FriendsModels");
const Request = require("../models/RequestsModel");
const functions = require("../functions/");
const NotificationModel = require("../models/NotificationModel");
const socketServer = require("../socket/MyServer");

class FriendsController {
    async AddFriend(req, res) {
        const user = await functions.decodeJWT(req.headers.user);
        const target = req.params.userID;

        try {
            let isRequested = Request.findOne({
                sender: user.id,
                reciver: target
            });
            if (isRequested) {
                const deleteRequest = Request.deleteOne({
                    sender: user.id
                });
                return res.status(201).json({
                    code: 201,
                    status: true,
                    error: false,
                    success: true,
                    message: "Friend Request Cancelled"
                });
            }else{

            const targetUser = await User.findOne({ _id: target });
            const newMssage = new NotificationModel({
                sender_id: user.id,
                reciver_id: target,
                sender_name: user.name,
                sender_email: user.email,
                sender_avtar: user.avtar,
                message: `${user.name} Sent You A Friend Request`
            });
            let save = await newMssage.save();
            if (save) {
                const request = new Request({
                    sender: user.id,
                    reciver: target
                });
                await request.save();
                //socketServer.sendNotification()
                return res.status(201).json({
                    code: 201,
                    status: true,
                    error: false,
                    success: true,
                    message: "Friend Request Sent"
                });
            } else {
                throw new Error("Unable to add friend");
            }
            }
        } catch (error) {
            console.log(
                "Error in friends controller->AddFriend : ",
                error.message
            );
            return res.status(403).json({
                code: 403,
                status: false,
                error: true,
                success: false,
                message: error.message
            });
        }
    }
    async getAllUsers(req, res) {
        try {
            const id = req.params.userID;
            const users = await User.find({ _id: { $ne: id } }).select(
                -"password"
            );
            const currentUser = req.params.userID;
            // Prepare an array to hold user relationship info
            const usersWithRelationships = await Promise.all(
                users.map(async user => {
                    const query = {
                        userOne: currentUser,
                        userTwo: user._id
                    } || { userTwo: currentUser, userOne: user._id };
                    const query2 = {
                        sender: currentUser,
                        reciver: user._id
                    } || { reciver: currentUser, sender: user._id };
                    const isFriend = await Friend.findOne(query);
                    const isRequested = await Request.findOne({
                        sender: currentUser,
                        reciver: user._id
                    });
                    let userType = null;
                    if (isFriend) {
                        userType = "Friendship";
                    } else if (isRequested) {
                        userType = "Requested";
                    }

                    return {
                        ...user.toObject(),
                        userType: userType
                    };
                })
            );
            return res.status(200).json({
                peoples: usersWithRelationships,
                success: true
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    }
    async getNotification(req, res) {
        let id = req.params.userID;
        try {
            const notification = await NotificationModel.find({ reciver: id });
            if (notification.length > 0) {
                res.json(notification);
            } else {
                res.json({
                    code: 403,
                    error: true,
                    success: false,
                    message: "No Notification Found"
                });
            }
        } catch (error) {
            console.log("Error In Notification Controller : ", error.message);
        }
    }
}

module.exports = new FriendsController();
