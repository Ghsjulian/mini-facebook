// Creating The User Controller Class Here...
// Requiring the modules here
const path = require("path");
const dotenv = require("dotenv").config("../../.env");
const UserModel = require("../models/User.Model");
const Utils = require("../utils/Utils");
const api = process.env.API;

class USerController {
    async UserSignup(req, res) {
        const { name, email, password } = req.body;
        // Create Validation
        if (
            name.trim() === "" &&
            email.trim() === "" &&
            password.trim() === ""
        ) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "name",
                message: "All Fields Are Required"
            });
        } else if (name.trim() === "") {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "name",
                message: "User Name Is Required"
            });
        } else if (email.trim() === "") {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "email",
                message: "Email Is Required"
            });
        } else if (password.trim() === "") {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "password",
                message: "Password Is Required"
            });
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                email.trim()
            )
        ) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "email",
                message: "Invalid Email Address"
            });
        } else if (password.trim().length < 5) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "password",
                message: "Password Will Be 6<"
            });
        } else {
            // If Everything Is Okay
            try {
                const isExist = await UserModel.findOne({
                    email
                });
                if (isExist) {
                    throw new Error("User Already Registered !");
                } else {
                    const hashedPassword = await Utils.makeHash(password);
                    const newUser = await new UserModel({
                        name,
                        email,
                        password: hashedPassword
                    });
                    if (await newUser.save()) {
                        const currentID = newUser._id;
                        const token = await Utils.encodeJWT({
                            id: currentID,
                            name,
                            email
                        });
                        const updateToken = await UserModel.findOneAndUpdate(
                            { email: email },
                            { token: token }
                        );
                        if (updateToken) {
                            let user = {
                                id: currentID,
                                name,
                                email,
                                token,
                                friends: newUser.friends,
                                avatar: newUser.avatar
                            };
                            await Utils.setCookie(res, token);
                            return res.json({
                                cose: 201,
                                user,
                                success: true,
                                status: "success",
                                message: "User Registration Successfully!"
                            });
                        } else {
                            throw new Error("User Registration Faild!");
                        }
                    } else {
                        throw new Error("Error While Creating User!");
                    }
                }
            } catch (error) {
                return res.json({
                    code: 505,
                    status: false,
                    error: true,
                    success: false,
                    message: error.message || "Server Timeout Error"
                });
            }
        }
    }
    async UserLogin(req, res) {
        const { email, password } = req.body;
        // Create Validation
        if (email.trim() === "" && password.trim() === "") {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "name",
                message: "All Fields Are Required"
            });
        } else if (email.trim() === "") {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "email",
                message: "Email Is Required"
            });
        } else if (password.trim() === "") {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "password",
                message: "Password Is Required"
            });
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                email.trim()
            )
        ) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "email",
                message: "Invalid Email Address"
            });
        } else if (password.trim().length < 5) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "password",
                message: "Password Will Be 6<"
            });
        } else {
            // If Everything Is Okay
            try {
                const isExist = await UserModel.findOne({
                    email
                });

                if (isExist) {
                    if (isExist.email === email.trim()) {
                        const isOkPassword = await Utils.compareHashed(
                            password,
                            isExist.password
                        );
                        if (isOkPassword) {
                            const id = isExist._id;
                            const name = isExist.name;
                            const email = isExist.email;
                            const token = await Utils.encodeJWT({
                                id,
                                name,
                                email
                            });
                            const update = await UserModel.findOneAndUpdate(
                                { email: email },
                                { token: token }
                            );
                            if (update) {
                                const user = {
                                    id: isExist._id,
                                    name: isExist.name,
                                    email: isExist.email,
                                    avatar: isExist.avatar,
                                    friends: isExist.friends,
                                    token: isExist.token
                                };
                                // Setting Cookies In Response
                                // functions.setCookie(res, token);
                                return res.status(200).json({
                                    code: 200,
                                    user,
                                    status: "success",
                                    error: false,
                                    success: true,
                                    message: "User Logged In Successfully"
                                });
                            } else {
                                throw new Error("Login Faild Please Try Again");
                            }
                        } else {
                            throw new Error("Invalid Email Or Password");
                        }
                    } else {
                        throw new Error("Invalid Credentials");
                    }
                } else {
                    throw new Error("Invalid User Details");
                }
            } catch (error) {
                return res.json({
                    code: 505,
                    status: false,
                    error: true,
                    success: false,
                    message: error.message || "Server Timeout Error"
                });
            }
        }
    }
    async UserMe(req, res) {
        try {
            if (req.user._id) {
                const user = await UserModel.findOne({ _id: req.user._id });
                return res.status(200).json(user);
            } else {
                throw new Error("Unauthorized User");
            }
        } catch (error) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                message: error.message || "Something Went Worng"
            });
        }
    }
    async GetOneUser(req, res) {
        try {
            if (req.user._id) {
                const user = await UserModel.findOne({
                    _id: req.params.user_id
                });
                if (user) {
                    return res.status(200).json(user);
                } else {
                    throw new Error("No User Found In The Server");
                }
            } else {
                throw new Error("Unauthorized User");
            }
        } catch (error) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                message: error.message || "Something Went Worng"
            });
        }
    }
    async GetAllUser(req, res) {
        try {
            if (req.user._id) {
                const users = await UserModel.find({
                    _id: { $ne: req.user._id }
                }).select(-"password");
                if (users) {
                    return res.status(200).json(users);
                } else {
                    throw new Error("No User Found In The Server");
                }
            } else {
                throw new Error("Unauthorized User");
            }
        } catch (error) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                message: error.message || "Something Went Worng"
            });
        }
    }
    async UserLogout(req, res) {
        try {
            if (req.user._id) {
                res.cookie("minifacebook", "", {
                    maxAge: 0
                });
                return res.json({
                    code: 200,
                    status: true,
                    error: false,
                    success: true,
                    message: "User Logged Out Successfully"
                });
            } else {
                throw new Error("Unauthorized User");
            }
        } catch (error) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                message: error.message || "Something Went Worng"
            });
        }
    }
    async UserUpdate(req, res) {
        const data = JSON.parse(req.body.data);
        var isAvatar = false;
        var filename = "";
        var password = "";

        try {
            if (data.avatar === "YES") {
                isAvatar = true;
                filename = req.file.filename;
                data.avatar = api + "/users/" + req.file.filename;
            }
            if (data.current_password && data.current_password.length < 6) {
                throw new Error("Current Password Will Be 6 Character");
            }
            if (data.new_password && data.new_password.length < 6) {
                throw new Error("New Password Will Be 6 Character");
            }
            const isExist = await UserModel.findOne({ _id: req.user._id });
            if (isExist) {
                const isOkPassword = await Utils.compareHashed(
                    data.current_password,
                    isExist.password
                );
                if (isOkPassword) {
                    password = data.new_password;
                    delete data.new_password;
                    delete data.current_password;
                    data.password = await Utils.makeHash(password);
                    const update = await UserModel.findByIdAndUpdate(
                        req.user._id,
                        data
                    );
                    if (update) {
                        return res.status(200).json({
                            code: 200,
                            status: true,
                            error: false,
                            success: true,
                            message: "Profile Updated Successfully"
                        });
                    } else {
                        throw new Error("Error While Updating Profile !");
                    }
                } else {
                    throw new Error("Current Password Is Invalid");
                }
            } else {
                throw new Error("User Not Found");
            }
        } catch (error) {
            if (isAvatar) {
                await Utils.DeleteFile(filename);
                return res.status(403).json({
                    code: 403,
                    status: false,
                    error: true,
                    success: false,
                    message: error.message || "Server Error -403"
                });
            } else {
                return res.status(403).json({
                    code: 403,
                    status: false,
                    error: true,
                    success: false,
                    message: error.message || "Server Error -403"
                });
            }
        }
    }
    async DeleteUser(req, res) {
        try {
            if (req.user._id) {
                const deleteuser = await UserModel.deleteOne({ _id: id });
                if (deleteuser) {
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        error: false,
                        success: true,
                        message: "User Deleted Successfully"
                    });
                } else {
                    throw new Error("Something Went Wrong");
                }
            } else {
                throw new Error("User ID Not Found");
            }
        } catch (error) {
            return res.status(403).json({
                code: 403,
                status: false,
                error: true,
                success: false,
                message: error.message
            });
        }
    }
    async SendFriendRequest(req, res) {
        try {
            if (req.user._id) {
                const user = await UserModel.findOne({
                    _id: req.params.user_id
                });
                if (user) {
                    const requests = user.requests;
                    if (requests.includes(req.user._id)) {
                        await UserModel.updateOne(
                            { _id: req.params.user_id },
                            { $pull: { requests: req.user._id } }
                        );
                        return res.json({
                            code: 200,
                            status: true,
                            error: false,
                            success: true,
                            message: "Friend Request Cancelled"
                        });
                    } else {
                        await UserModel.updateOne(
                            { _id: req.params.user_id },
                            { $addToSet: { requests: req.user._id } }
                        );
                        return res.json({
                            code: 200,
                            status: true,
                            error: false,
                            success: true,
                            message: "Friend Request Sent"
                        });
                    }
                } else {
                    throw new Error("No User Found In The Server");
                }
            } else {
                throw new Error("Unauthorized User");
            }
        } catch (error) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                message: error.message || "Something Went Worng"
            });
        }
    }
    async AcceptFriendRequest(req, res) {
        try {
            if (req.user._id) {
                const user = await UserModel.findOne({
                    _id: req.user._id
                });
                if (user) {
                    const friends = user.friends;
                    if (!friends.includes(req.params.user_id)) {
                        await UserModel.updateOne(
                            { _id: req.user._id },
                            { $addToSet: { friends: req.params.user_id } }
                        );
                        await UserModel.updateOne(
                            { _id: req.params.user_id },
                            { $addToSet: { friends: req.user._id } }
                        );
                        return res.json({
                            code: 200,
                            status: true,
                            error: false,
                            success: true,
                            message: "Friend Request Accepted"
                        });
                    } else {
                        throw new Error("You're Aleady Friend");
                    }
                } else {
                    throw new Error("No User Found In The Server");
                }
            } else {
                throw new Error("Unauthorized User");
            }
        } catch (error) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                message: error.message || "Something Went Worng"
            });
        }
    }
    async UnFriend(req, res) {
        try {
            if (req.user._id) {
                const user = await UserModel.findOne({
                    _id: req.user._id
                });
                if (user) {
                    const friends = user.friends;
                    if (friends.includes(req.params.user_id)) {
                        await UserModel.updateOne(
                            { _id: req.user._id },
                            { $pull: { friends: req.params.user_id } }
                        );
                        await UserModel.updateOne(
                            { _id: req.params.user_id },
                            { $pull: { friends: req.user._id } }
                        );
                        return res.json({
                            code: 200,
                            status: true,
                            error: false,
                            success: true,
                            message: "Unfriend Successfully"
                        });
                    } else {
                        throw new Error("You're Not Friend");
                    }
                } else {
                    throw new Error("No User Found In The Server");
                }
            } else {
                throw new Error("Unauthorized User");
            }
        } catch (error) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                message: error.message || "Something Went Worng"
            });
        }
    }
}

module.exports = new USerController();
