const UserModel = require("../models/User.Model");
const Utils = require("../utils/Utils");

const islogin = async (req, res, next) => {
    const token = req.headers.minifacebook || null;
    try {
        if (token && token !== null) {
            const data = await Utils.decodeJWT(token);
            if (data && data.id) {
                const user = await UserModel.findOne({ _id: data.id });
                if (user && user._id) {
                    req.user = user;
                    next();
                } else {
                    throw new Error("Unauthorized - No User Found");
                }
            } else {
                console.log("Invalid Cookie");
                throw new Error("Invalid User Cookie");
            }
        } else {
            console.log("Cookie Not Found");
            throw new Error("Cookie Not Found");
        }
    } catch (error) {
        console.log("ERROR : --> ", error);
        return res.json({
            code: 403,
            status: false,
            error: true,
            success: false,
            message: error.message
        });
    }
};

module.exports = islogin;
