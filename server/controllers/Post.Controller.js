// Creating The Post Controller Class Here...
// Requiring the modules here
const path = require("path");
const dotenv = require("dotenv").config("../../.env");
const UserModel = require("../models/User.Model");
const PostModel = require("../models/Post.Model");
const Utils = require("../utils/Utils");
const api = process.env.API;

class PostController {
    async CreatePost(req, res) {
        const data = JSON.parse(req.body.data) || null;
        var isPostImg = false;
        var filename = "";
        try {
            if (data === null) {
                throw new Error("No Value Provided");
            }
            if (data.post_img === "YES") {
                isPostImg = true;
                filename = req.file.filename;
                data.post_img = api + "/post/" + req.file.filename;
            }
            if (data.post_content === "") {
                throw new Error("Post Content Is Required");
            }
            const newPost = await new PostModel({
                poster_id: req.user._id,
                post_img: isPostImg ? data.post_img : null,
                post_content: data.post_content
            });
            const savePost = await newPost.save();
            if (savePost) {
                return res.status(201).json({
                    code: 201,
                    status: true,
                    error: false,
                    success: true,
                    post_id: newPost._id,
                    message: "New Post Created Successfully"
                });
            } else {
                throw new Error("Error While Creating New Post");
            }
        } catch (error) {
            if (isPostImg) {
                await Utils.DeleteFile(filename);
                return res.status(403).json({
                    code: 403,
                    status: false,
                    error: true,
                    success: false,
                    message: error.message || "Server Error -403"
                });
            } else {
                return res.status(403).json({
                    code: 403,
                    status: false,
                    error: true,
                    success: false,
                    message: error.message || "Server Error -403"
                });
            }
        }
    }
    async EditPost(req, res) {
        const data = JSON.parse(req.body.data) || null;
        var isPostImg = false;
        var filename = "";
        var oldPostImg = "";
        try {
            if (data === null) {
                throw new Error("No Value Provided");
            }
            if (data.post_img === "YES") {
                isPostImg = true;
                filename = req.file.filename;
                data.post_img = api + "/post/" + req.file.filename;
            }
            if (data.post_content === "") {
                throw new Error("Post Content Is Required");
            }

            const post = await PostModel.findOne({
                _id: req.params.post_id,
                poster_id: req.user._id
            });
            if (post._id) {
                oldPostImg = post.post_img;
                const updatePost = await PostModel.findByIdAndUpdate(
                    req.params.post_id,
                    data
                );
                if (updatePost) {
                    await Utils.DeleteOldImg(oldPostImg);
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        error: false,
                        success: true,
                        message: "Post Updated Successfully"
                    });
                } else {
                    throw new Error("Post Updated Faild");
                }
            } else {
                throw new Error("Post Not Found In Server!");
            }
        } catch (error) {
            if (isPostImg) {
                await Utils.DeleteFile(filename);
                return res.status(403).json({
                    code: 403,
                    status: false,
                    error: true,
                    success: false,
                    message: error.message || "Server Error -403"
                });
            } else {
                return res.status(403).json({
                    code: 403,
                    status: false,
                    error: true,
                    success: false,
                    message: error.message || "Server Error -403"
                });
            }
        }
    }
    async GetOnePost(req, res) {
        try {
            const post = await PostModel.findOne({
                _id: req.params.post_id
            });
            if (post) {
                res.json(post);
            } else {
                throw new Error("Post Not Found In The Server");
            }
        } catch (error) {
            return res.status(404).json({
                code: 404,
                status: false,
                error: true,
                success: false,
                message: error.message || "Server Error -403"
            });
        }
    }
    async GetAllPost(req, res) {
        try {
            const post = await PostModel.find();
            if (post) {
                res.json(post);
            } else {
                throw new Error("No Post Found In The Server");
            }
        } catch (error) {
            return res.status(404).json({
                code: 404,
                status: false,
                error: true,
                success: false,
                message: error.message || "Server Error -403"
            });
        }
    }
    async GetUserAllPost(req, res) {
        const id = req.params.user_id;
        try {
            const posts = await PostModel.find({ poster_id: id });
            if (posts) {
                res.json({
                    code: 200,
                    posts,
                    status: true,
                    success: true,
                    message : "Total "+posts.length+" Post Found"
                });
            } else {
                throw new Error("No Post Found In The Server");
            }
        } catch (error) {
            return res.status(404).json({
                code: 404,
                status: false,
                posts: [],
                error: true,
                success: false,
                message: error.message || "Server Error -403"
            });
        }
    }
    async DeletePost(req, res) {
        try {
            const post = await PostModel.findOne({
                _id: req.params.post_id,
                poster_id: req.user._id
            });
            if (post) {
                const deletePost = await PostModel.deleteOne({
                    _id: req.params.post_id
                });
                if (deletePost) {
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        error: false,
                        success: true,
                        message: "Post Deleted Successfully"
                    });
                } else {
                    throw new Error("Post Deleted Failed");
                }
            } else {
                throw new Error("Post Not Found In The Server");
            }
        } catch (error) {
            return res.status(404).json({
                code: 404,
                status: false,
                error: true,
                success: false,
                message: error.message || "Server Error -403"
            });
        }
    }
    async LikePost(req, res) {
        try {
            const post = await PostModel.findOne({
                _id: req.params.post_id
            });
            if (post) {
                const likes = post.post_likes;
                if (likes.includes(req.user._id)) {
                    await PostModel.updateOne(
                        { _id: req.params.post_id },
                        { $pull: { post_likes: req.user._id } }
                    );
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        error: false,
                        success: true,
                        message: "Post DisLiked Successfully"
                    });
                } else {
                    await PostModel.updateOne(
                        { _id: req.params.post_id },
                        { $addToSet: { post_likes: req.user._id } }
                    );
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        error: false,
                        success: true,
                        message: "Post Liked Successfully"
                    });
                }
            } else {
                throw new Error("Post Not Found In The Server");
            }
        } catch (error) {
            return res.status(404).json({
                code: 404,
                status: false,
                error: true,
                success: false,
                message: error.message || "Server Error -403"
            });
        }
    }
    async CommentPost(req, res) {
        try {
            const { comment } = req.body;
            const post = await PostModel.findOne({
                _id: req.params.post_id
            });
            if (post) {
                await PostModel.updateOne(
                    { _id: req.params.post_id },
                    {
                        $push: {
                            post_comments: {
                                commenter_id: req.user._id,
                                comment_text: comment
                            }
                        }
                    }
                );
                return res.status(201).json({
                    code: 201,
                    status: true,
                    error: false,
                    success: true,
                    message: "Post Commented Successfully"
                });
            } else {
                throw new Error("Post Not Found In The Server");
            }
        } catch (error) {
            return res.status(404).json({
                code: 404,
                status: false,
                error: true,
                success: false,
                message: error.message || "Server Error -403"
            });
        }
    }
    async DeleteComment(req, res) {
        try {
            const { comment } = req.body;
            const post = await PostModel.findOne({
                _id: req.params.post_id
            });
            if (post) {
                await PostModel.updateOne(
                    { _id: req.params.post_id },
                    {
                        $pull: {
                            post_comments: {
                                commenter_id: req.user._id,
                                comment_text: comment
                            }
                        }
                    }
                );
                return res.status(201).json({
                    code: 201,
                    status: true,
                    error: false,
                    success: true,
                    message: "Post Commented Successfully"
                });
            } else {
                throw new Error("Post Not Found In The Server");
            }
        } catch (error) {
            return res.status(404).json({
                code: 404,
                status: false,
                error: true,
                success: false,
                message: error.message || "Server Error -403"
            });
        }
    }
}

module.exports = new PostController();
