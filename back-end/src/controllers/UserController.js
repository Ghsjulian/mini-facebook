// Import Files Here
const dotenv = require("dotenv").config("../../.env");
const UserModel = require("../models/UserModel");
const NotificationModel = require("../models/NotificationModel");
const functions = require("../functions/");
const api = process.env.API;

class UserController {
    async UserSignup(req, res) {
        const { name, email, password } = req.body;
        var isError;

        // Create Validation
        if (
            name.trim() === "" &&
            email.trim() === "" &&
            password.trim() === ""
        ) {
            isError = true;
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "name",
                message: "All Fields Are Required"
            });
        } else if (name.trim() === "") {
            isError = true;
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "name",
                message: "User Name Is Required"
            });
        } else if (email.trim() === "") {
            isError = true;
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "email",
                message: "Email Is Required"
            });
        } else if (password.trim() === "") {
            isError = true;
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
            isError = true;
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
            isError = false;
        }
        // If Everything Is Okay
        if (!isError) {
            try {
                const isExist = await UserModel.findOne({
                    email: email
                });
                if (isExist) {
                    throw new Error("User Already Registered !");
                } else {
                    var date = new Date();
                    const today = date.toDateString();
                    const hashPassword = await functions.makeHash(password);
                    const jwt = await functions.encodeJWT({
                        name,
                        email,
                        today
                    });
                    const newUser = new UserModel({
                        name,
                        email,
                        password: hashPassword,
                        avtar: api + "/users/default-user.png",
                        connections: [],
                        token: jwt,
                        type: "USER"
                    });
                    const save = await newUser.save();
                    if (save) {
                        const currentUser = await UserModel.findOne({
                            email: email
                        });
                        if (currentUser) {
                            const id = currentUser._id;
                            const u_type = currentUser.type;
                            const update = await UserModel.findOneAndUpdate(
                                { email: email },
                                { token: jwt }
                            );
                            if (update) {
                                const user = {
                                    id: currentUser._id,
                                    name: currentUser.name,
                                    email: currentUser.email,
                                    avtar: currentUser.avtar,
                                    user_type: currentUser.type,
                                    connection: currentUser.connection,
                                    token: currentUser.token,
                                    date: today
                                };
                                return res.status(200).json({
                                    code: 200,
                                    user,
                                    status: true,
                                    error: false,
                                    success: true,
                                    message: "Registration Successfully"
                                });
                            } else {
                                throw new Error("Error Please Try Again");
                            }
                        } else {
                            throw new Error("Server Not Responding");
                        }
                    } else {
                        throw new Error("Something Went Wrong");
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
        var isError;

        // Create Validation
        if (email === "" && password === "") {
            isError = true;
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "email",
                message: "All Fields Are Required"
            });
        } else if (email === "") {
            isError = true;
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "email",
                message: "Email Is Required"
            });
        } else if (password === "") {
            isError = true;
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "password",
                message: "Password Is Required"
            });
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
            isError = true;
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "email",
                message: "Invalid Email Address"
            });
        } else if (password.length < 5) {
            return res.json({
                code: 403,
                status: false,
                error: true,
                success: false,
                loc: "password",
                message: "Password Will Be 6<"
            });
        } else {
            isError = false;
        }
        // If Everything Is Okay
        if (!isError) {
            try {
                const isExist = await UserModel.findOne({
                    email: email.trim()
                });
                if (isExist) {
                    if (isExist.email === email.trim()) {
                        const isOkPassword = await functions.compareHashed(
                            password,
                            isExist.password
                        );
                        if (isOkPassword) {
                            var date = new Date();
                            const today = date.toDateString();
                            const name = isExist.name;
                            const id = isExist._id;
                            const u_type = isExist.type;
                            const token = await functions.encodeJWT({
                                name,
                                email,
                                today
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
                                    avtar: isExist.avtar,
                                    user_type: isExist.type,
                                    connection: isExist.connection,
                                    token: isExist.token,
                                    date: today
                                };
                                return res.status(200).json({
                                    code: 200,
                                    user,
                                    status: true,
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
    async EditUser(req, res) {
        const data = JSON.parse(req.body.data);
        var avtar = null;
        if (data.avtar === "YES") {
            data.avtar = api + "/users/" + req.file.filename;
        }
        if (data.password && data.password !== null) {
            const hashPassword = await functions.makeHash(data.password);
            data.password = hashPassword;
        }
        try {
            const update = await UserModel.findByIdAndUpdate(
                req.params.userID,
                data
            );
            if (update) {
                const isExist = await UserModel.findOne({
                    _id: req.params.userID
                });
                var date = new Date();
                const today = date.toDateString();
                const user = {
                    id: isExist._id,
                    name: isExist.name,
                    email: isExist.email,
                    avtar: isExist.avtar,
                    user_type: isExist.type,
                    connection: isExist.connection,
                    token: isExist.token,
                    date: today
                };
                return res.status(200).json({
                    code: 200,
                    status: true,
                    error: false,
                    success: true,
                    user,
                    message: "Profile Updated Successfully"
                });
            } else {
                throw new Error("Faild To Update Profile ");
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
    async DeleteUser(req, res) {
        const id = req.params.userID;
        try {
            if (id) {
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
    async GetSingleUser(req, res) {
        const id = req.params.userID;
        try {
            if (id) {
                const user = await UserModel.finOne({ _id: id });
                if (user) {
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        error: false,
                        success: true,
                        user,
                        message: "User Found Successfully"
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
    async GetAllUser(req, res) {
        var peoples = [];
        var requested = [];
        let id = req.params.userID;
        try {
            // If Requested
            const request = await NotificationModel.find({ sender_id: id });
            const users = await UserModel.find({ _id: { $ne: id } }).select(
                -"password"
            );

            if (request.length > 0) {
                request.forEach(reqUser => {
                    if (
                        reqUser.sender_id === id ||
                        reqUser.to.id.toString() === id
                    ) {
                        requested.push(reqUser);
                    }
                });
            }

            if (users) {
                users.forEach(user => {
                    peoples.push({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        avtar: user.avtar
                    });
                });

                return res.status(200).json({
                    code: 200,
                    status: true,
                    error: false,
                    success: true,
                    peoples,
                    message: "User Found Successfully"
                });
            } else {
                throw new Error("Something Went Wrong");
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
    async UserLogout(req, res) {
        console.log("Logout...");
        console.log(req.headers.user);
        res.json({ msg: "okkk" });
    }
}

module.exports = new UserController();
