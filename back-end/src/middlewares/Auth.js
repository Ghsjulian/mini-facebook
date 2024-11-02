const UserModel = "../models/UserModel";
const functions = require("../functions/");

const islogin = async (req, res) => {
    console.log(req.headers);

    /*
    try {
        const token = req.body.token;
        if (token && token !== null) {
            const data = await decodeJWT(token);
            if (data && data.token) {
                console.log(data);
            }
        } else {
            throw new Error("Cookie Not Found");
        }
    } catch (error) {
        console.log(error);
        return;
        return res.json({
            code: 403,
            status: false,
            error: true,
            success: false,
            message: error.message
        });
        */
};

module.exports = islogin;
