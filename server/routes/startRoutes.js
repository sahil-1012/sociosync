const express = require("express");
const { verifyToken } = require("../middleware/auth.js");
const { getFeedPosts, getUserPosts, likePost, createPost } = require("../controller/post.js");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to sociopedia Server");
});



module.exports = router;
