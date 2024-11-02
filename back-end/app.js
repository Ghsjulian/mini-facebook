const express = require("express");
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const server = require("http").createServer(app);
const socketManager = require("./src/socket/");
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "127.0.0.1";
const DB = process.env.SERVER_DB || "mini-facebook";
const URI = process.env.SERVER_URI || "mongodb://localhost:27017/";

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cors({ origin: "*" }));
app.use(cookieParser());

 socketManager.init(server);
// Static Routes Here
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/login", (req, res) => {
    res.render("login");
});

// setup api endpoints here
const router = require("./src/router/");
app.use("/api", router);

mongoose
    .connect(URI, { dbName: DB })
    .then(() => {
        server.listen(PORT, () => {
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
module.exports = app;
