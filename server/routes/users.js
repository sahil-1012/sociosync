import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addRemoveFriends, getUser, getUserFriends } from "../controller/users.js";



const router = express.Router();

router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

router.patch('/:id/:friendId', verifyToken, addRemoveFriends);

export default router;