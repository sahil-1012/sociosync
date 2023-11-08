const express = require("express");
const { verifyToken } = require("../middleware/auth.js");
const { getFeedPosts, getUserPosts, likePost } = require("../controller/post.js");

const router = express.Router();

router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.patch('/:postId/like', verifyToken, likePost);

module.exports = router;
