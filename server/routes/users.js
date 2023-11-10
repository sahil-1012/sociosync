const express = require("express");
const { verifyToken } = require("../middleware/auth.js");
const { addRemoveFriends, getUser, getUserFriends, updateName, uploadProfilePhoto, getProfilePhoto } = require("../controller/users.js");

const router = express.Router();

router.get('/:id', verifyToken, getUser);

router.get('/getPhoto/:id', verifyToken, getProfilePhoto);
router.post('/uploadPhoto/:id', verifyToken, uploadProfilePhoto);
router.patch('/:id/updateName', verifyToken, updateName);
router.get('/:id/friends', verifyToken, getUserFriends);

router.patch('/:id/:friendId', verifyToken, addRemoveFriends);

module.exports = router;
