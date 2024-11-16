const express = require("express");
const path = require("path");
const router = express.Router();
const USerController = require("../controllers/User.Controller");
const isLogin = require("../middlewares/isLogin");
const { UpdateAvatar } = require("../utils/Multer.Config");
const uploadFolder = path.join(__dirname, "../public/users/");
const upload = UpdateAvatar(uploadFolder);

router.post("/signup", USerController.UserSignup);
router.post("/login", USerController.UserLogin);
router.post("/logout", isLogin, USerController.UserLogout);
router.get("/get-me", isLogin, USerController.UserMe);
router.put(
    "/edit-profile",
    isLogin,
    upload.fields([
        { name: "profilePic", maxCount: 1 },
        { name: "coverPic", maxCount: 1 }
    ]), // Modify this line
    USerController.UserProfileUpdate
);
router.put("/edit-personal-info",isLogin,USerController.PersonalInfoUpdate)
router.get("/get-user/:user_id", isLogin, USerController.GetOneUser);
router.get("/get-all-user", isLogin, USerController.GetAllUser);
router.get(
    "/send-friend-request/:user_id",
    isLogin,
    USerController.SendFriendRequest
);
router.get(
    "/accept-friend-request/:user_id",
    isLogin,
    USerController.AcceptFriendRequest
);
router.get("/get-all-friends", isLogin, USerController.AllFriends);
router.get("/unfriend/:user_id", isLogin, USerController.UnFriend);

module.exports = router;
