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