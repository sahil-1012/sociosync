import Post from '../models/post.js';

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

        res.status(201).json(post.comments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
};
