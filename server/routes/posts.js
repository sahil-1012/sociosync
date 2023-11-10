const express = require("express");
const { verifyToken } = require("../middleware/auth.js");
const { getFeedPosts, getUserPosts, likePost, createPost, createPhotoUrl } = require("../controller/post.js");

const router = express.Router();

router.use(express.json())

router.get('/', verifyToken, getFeedPosts);
router.post("/addPost", verifyToken, createPost)  
router.get("/addPost/photo", verifyToken, createPhotoUrl)  

router.get('/:userId/posts', verifyToken, getUserPosts);
router.patch('/:postId/like', verifyToken, likePost);

module.exports = router;
