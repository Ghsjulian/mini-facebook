const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        poster_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        poster_name: {
            type: String,
            required: true
        },
        poster_avatar: {
            type: String,
            required: true
        },
        post_content: {
            type: String,
            required: true
        },
        post_img: {
            type: String
        },
        post_likes: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            ]
        },
        post_comments: {
            type: [
                {
                    
                }
            ]
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
