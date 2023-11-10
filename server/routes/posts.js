const express = require("express");
const { verifyToken } = require("../middleware/auth.js");
const { getFeedPosts, getUserPosts, likePost, createPost } = require("../controller/post.js");

const router = express.Router();

router.get('/', verifyToken, getFeedPosts);
router.post("/addPost", verifyToken, createPost)   
router.get('/:userId/posts', verifyToken, getUserPosts);
router.patch('/:postId/like', verifyToken, likePost);

module.exports = router;
