const express = require("express");
const { verifyToken } = require("../middleware/auth.js");
const { createComment } = require("../controller/comment.js");

const router = express.Router();

router.post('/addComment', verifyToken, createComment);

module.exports = router;

