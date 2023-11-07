import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createComment } from "../controller/comment.js";

const router = express.Router();

router.post('/addComment', verifyToken, createComment);

export default router;

