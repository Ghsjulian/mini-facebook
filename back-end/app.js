const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const socketManager = require("./socket/MyServer");
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "127.0.0.1";
const DB = process.env.SERVER_DB || "mini-facebook";
const URI = process.env.SERVER_URI || "mongodb://localhost:27017/";

const publicPath = path.join(__dirname);
socketManager.app.use(express.static(publicPath+"/public/"));
socketManager.app.use(express.json());
socketManager.app.use(express.urlencoded({ extended: true }));
socketManager.app.use(cors({ origin: "*" }));
socketManager.app.use(cookieParser());

// socketManager.init(server);
// Static Routes Here
socketManager.app.get("/", (req, res) => {
    res.json({
        message: "Home Routes..."
    });
});

// setup api endpoints here
const router = require("./router/");
socketManager.app.use("/api", router);

mongoose
    .connect(URI, { dbName: DB })
    .then(() => {
        socketManager.server.listen(PORT, () => {
            console.clear();
            console.log(
                `\n ____________________________________________________`
            );
            console.log(`\n [+]  SERVER IS RUNNING - ${HOST}:${PORT}`);
            console.log(`\n [+]  WEB DEVELOPER NAME : GHS JULIAN`);
            console.log(`\n [+]  https://github.com/Ghsjulian`);
            console.log(`\n [+]  https://ghsresume.netlify.app`);
            console.log(
                ` ____________________________________________________\n\n`
            );
        });
    })
    .catch(error => {
        console.clear();
        console.log(error);
    });
