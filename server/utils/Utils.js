const dotenv = require("dotenv").config("../../.env");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const expiresIn = process.env.EXPIRES_IN;
const path = require("path");
const fs = require("fs");
const UserModel = require("../models/User.Model")

const makeHash = async password => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log("Error Hashing Password");
    }
};
const compareHashed = async (password, hashedPassword) => {
    try {
        return await bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
        console.log(error);
    }
};
const encodeJWT = async payload => {
    return jwt.sign(payload, secretKey, { expiresIn });
};
const decodeJWT = async token => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
};
const setCookie = async (res, value) => {
    res.cookie("minifacebook", value, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httponly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
    return true;
};

const DeleteFile = async (filepath, type) => {
    let url = filepath.split("/");
    let len = url.length;
    let filename = url[len - 1];
    let file = path.join(__dirname, "../public/users/", filename);
    if (filename !== type) {
        try {
            //await fs.unlink(file);
            await fs.unlinkSync(file);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    } else {
        return;
    }
};
const DeleteOldImg = async filepath => {
    try {
        let url = filepath.split("/");
        let len = url.length;
        let filename = url[len - 1];
        let file = path.join(__dirname, "../public/post/", filename);
        await fs.unlinkSync(file);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const getUser = async(id)=>{
    try {
      const user = await UserModel.findOne({_id:id})
      if(user){
          return user
      } else {
          throw new Error("No User Found")
      }
    } catch (error) {
         
      console.log(error.message);
    }
}

module.exports = {
    makeHash,
    compareHashed,
    encodeJWT,
    decodeJWT,
    setCookie,
    DeleteFile,
    DeleteOldImg,
    getUser
};
