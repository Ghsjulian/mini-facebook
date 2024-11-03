const userModel = require("../models/UserModel");
const NotificationModel = require("../models/NotificationModel");

class FriendsController {
    async AddFriend(req, res) {
        const user = req.headers.user;
        const target = req.params.userID;
        try {
            const targetUser = await userModel.findOne({_id:target})
            let connections = targetUser.connections
            connections.push({
                request_id : user.id,
                friend_id : null
            })
            const update = await userModel.findOneAndUpdate(
                { _id: target },
                { connections }
            );
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
}

module.exports = new FriendsController();
