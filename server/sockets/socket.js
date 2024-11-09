const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app)

const users = {}
const IO = new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        method : ["GET","POST","PUT","DELETE"]
    }
})

// Create Socket Connection 
IO.on("connection",(socket)=>{
    console.log("\n [+] --> A User Connected\n");
    
    socket.on("connection",(socket)=>{
    console.log("\n [-] --> A User Disonnected\n");
})
})

// Export All 
module.exports = {app,server,IO}