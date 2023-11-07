import Post from '../models/post.js';
import User from '../models/users.js';

// CREATE
export const createComment = async (req, res, next) => {
    try {
        const { userId, postId, comment } = req.body;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.comments.push({ userId, message: comment });
        await post.save();

        const formattedComments = await Promise.all(post.comments.map(async (comment) => {
            const user = await User.findById(comment.userId);
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

        res.status(200).json(responsePost);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
};
