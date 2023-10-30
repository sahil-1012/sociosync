import User from '../models/users.js'

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
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

export const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const userId = id
        const user = await User.findById(userId);

        const friend = await User.findById(friendId);

        // ~ IF FRIEND THEN REMOVE FRIEND
        if (user.friends.include(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== userId);

            // ~ IF NOT FRIEND THEN ADD FRIEND
        } else {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(userId))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends)

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}