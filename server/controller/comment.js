const Post = require('../models/post.js');
const User = require('../models/users.js');

// CREATE
const createComment = async (req, res) => {
    try {
        const { userId, postId, comment } = req.body;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.comments.push({ userId, message: comment });
        await post.save();

        const formattedComments = await Promise.all(post.comments.map(async (comment) => {
            const user = await User.findById(comment.userId).select('-picture');
            return {
                ...comment.toObject(),
                username: user.firstName + ' ' + user.lastName,
            };
        }));

        formattedComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        const responsePost = {
            ...post.toObject(),
            comments: formattedComments,
        };

        return res.status(200).json(responsePost);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = { createComment };
