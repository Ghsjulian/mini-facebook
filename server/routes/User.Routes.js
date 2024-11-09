const express = require("express");
const path = require("path");
const router = express.Router();
const USerController = require("../controllers/User.Controller");
const isLogin = require("../middlewares/isLogin");
const {UpdateAvatar} = require("../utils/Multer.Config");
const uploadFolder = path.join(__dirname, "../public/users/");
const upload = UpdateAvatar(uploadFolder);

router.post("/signup", USerController.UserSignup);
router.post("/login", USerController.UserLogin);
router.post("/logout", isLogin, USerController.UserLogout);
router.get("/get-me", isLogin, USerController.UserMe);
router.put(
    "/edit-profile",
    isLogin,
    upload.single("avatar"),
    USerController.UserUpdate
);

module.exports = router;
