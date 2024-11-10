const express = require("express");
const path = require("path");
const router = express.Router();
const MessageController = require("../controllers/Message.Controller");
const isLogin = require("../middlewares/isLogin");
const isFriend = require("../middlewares/isFriend");
//const { CreatePostImg } = require("../utils/Multer.Config");
//const uploadFolder = path.join(__dirname, "../public/post/");
//const upload = CreatePostImg(uploadFolder);

router.post(
    "/send-message/:receiver_id",
    isLogin,
    isFriend,
    MessageController.SendMessage
);
router.get("/get-message/:receiver_id", isLogin,isFriend, MessageController.GetMessages);

module.exports = router;
