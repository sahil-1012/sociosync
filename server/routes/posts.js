import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getFeedPosts, getUserPosts, likePost } from "../controller/post.js";

const router = express.Router();  


router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

router.get('/:userId/like', verifyToken, likePost);

export default router;

