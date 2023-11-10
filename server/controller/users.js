const { uploadFile } = require('../cloud/utils.js');
const User = require('../models/users.js');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-picture');
        res.status(200).json(user);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const uploadProfilePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const contentType = 'image/jpeg'
        const url = await uploadFile(id, contentType)
        res.status(200).json({ url });

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updateName = async (req, res) => {
    try {
        console.log("first")
        const { id } = req.params;
        const { firstName, lastName } = req.body;
        console.log(id, firstName, lastName)
        const user = await User.findByIdAndUpdate(id, { firstName, lastName }, { new: true }).select('-picture');

        return res.status(200).json(user);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-picture');

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id).select('-picture'))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const userId = id

        const user = await User.findById(userId).select('-picture');

        const friend = await User.findById(friendId).select('-picture');

        // ~ IF FRIEND SAME AS USER THEN REMOVE ALL USERID
        if (friendId === userId) {
            user.friends = user.friends.filter(id => id !== userId);
        }
        // ~ IF FRIEND THEN REMOVE FRIEND
        else if (user.friends.includes(friendId)) {
            console.log("object");
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== userId);
        }
        // ~ IF NOT FRIEND THEN ADD FRIEND
        else {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }

        await user.save();
        await friend.save();

        const formattedFriends = await Promise.all(
            user.friends.map(async (id) => {
                const friend = await User.findById(id).select({
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    occupation: 1,
                    location: 1,
                    picturePath: 1,
                });
                return friend;
            })
        );

        res.status(200).json(formattedFriends)

    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: err.message });
    }
}

module.exports = { getUser, uploadProfilePhoto, updateName, getUserFriends, addRemoveFriends };