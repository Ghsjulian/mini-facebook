// Import all modules here
const { server, app, IO } = require("./sockets/socket");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
// Declaring some variables
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "127.0.0.1";
const DB = process.env.SERVER_DB || "mini-facebook";
const URI = process.env.SERVER_URI || "mongodb://localhost:27017/";


// Defined Some Middlewares 
const publicPath = path.join(__dirname);
app.use(express.static(publicPath + "/public/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

// Import All Routes Here...
// Defined The API Endpoints 
const UserRouter = require("./routes/User.Routes")
const PostRouter = require("./routes/Post.Routes")
const MessageRouter = require("./routes/Message.Routes")
app.use("/api/user",UserRouter)
app.use("/api/post",PostRouter)
app.use("/api/message", MessageRouter)



// Setup Home index Routes 
app.get("/",(req,res)=>{
    res.json({
        message : "this is home routes"
    })
})

// Listening The Server
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
