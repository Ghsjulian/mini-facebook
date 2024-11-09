const express = require("express");
const path = require("path");
const router = express.Router();
const PostController = require("../controllers/Post.Controller");
const isLogin = require("../middlewares/isLogin");
const { CreatePostImg } = require("../utils/Multer.Config");
const uploadFolder = path.join(__dirname, "../public/post/");
const upload = CreatePostImg(uploadFolder);

router.post(
    "/create-post",
    isLogin,
    upload.single("post_img"),
    PostController.CreatePost
);
router.put(
    "/edit-post/:post_id",
    isLogin,
    upload.single("post_img"),
    PostController.EditPost
);
router.get("/get-post/:post_id", isLogin, PostController.GetOnePost);
router.get("/all-post", isLogin, PostController.GetAllPost);
router.delete("/delete-post/:post_id", isLogin, PostController.DeletePost);
router.get("/like-post/:post_id", isLogin, PostController.LikePost);
router.post("/comment-post/:post_id", isLogin, PostController.CommentPost);

module.exports = router;
