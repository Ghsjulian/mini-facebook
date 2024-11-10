const UserModel = require("../models/User.Model");
const Utils = require("../utils/Utils");

const isFriend = async (req, res, next) => {
    const token = req.headers.minifacebook || null;
    try {
        if (token && token !== null) {
            const data = await Utils.decodeJWT(token);
            if (data && data.id) {
                const user = await UserModel.findOne({ _id: data.id });
                if (user && user._id) {
                    const receiver_id = req.params.receiver_id
                    const friends = user.friends;
                    if(user.includes(receiver_id)){
                        next()
                    }else{
                        throw new Error("You're Not Friend Yet")
                    }
                }
            }
        }
    } catch (error) {
        console.log("Error in isFriend Middlewares --> ", error.message);
        return res.status(403).json({
            code: 403,
            status: false,
            error: true,
            success: false,
            message: error.message || "Internal server error -505"
        });
    }
};

module.exports = isFriend;
