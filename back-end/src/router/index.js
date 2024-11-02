const express = require("express");
const router = express.Router();
const multerConfig = require("../functions/multerConfig");
const UserController = require("../controllers/UserController");
const PostController = require("../controllers/UserController");
const uploadFolder = "./public/users/";
const upload = multerConfig(uploadFolder);

// Application Users Routes Here
router.post("/signup", UserController.UserSignup);
router.post("/login", UserController.UserLogin);
router.get("/logout", UserController.UserLogout);

router.put(
    "/edit-user/:userID",
    upload.single("file"),
    UserController.EditUser
);

router.delete("/delete-user/:userID", UserController.DeleteUser);
router.get("/get-user/:userID", UserController.GetSingleUser);
router.get("/all-users/:userID", UserController.GetAllUser);
/*
// Application Post Content Routes Here
router.post("/create-post", PostController.CreatePost);
router.put("/edit-post/:postID", PostController.EditPost);
router.delete("/delete-post/:postID", PostController.DeletePost);
router.get("/get-post/:postID", PostController.GetSinglePost);
router.get("/all-post", PostController.GetAllPost);
// Application PUT Routes Here
// Application DELETE Routes Here
*/

module.exports = router;
