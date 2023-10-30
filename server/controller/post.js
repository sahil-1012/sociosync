import Post from '../models/post.js';
import User from '../models/users.js';


// CREATE
export const createPost = async (req, res, next) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId)
        const newPost = new Post({
            user, description, picturePath,
            firstName: user.firstName, lastName: user.lastName,
            location: user.location, userPicturePath: user.picturePath,
            likes: {}, comments: []
        })
        await newPost.save();

        // const post = Post.find({userId})
        const post = Post.find()
        res.status(201).json(post)


    } catch (err) {
        return res.status(409).json({ message: err.message });
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        return res.status(200).json(post)

    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res,) => {
    try {
        const { userId } = req.body;
        const posts = await User.find({ userId })
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

// UPDATE
export const likePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true })
        res.status(200).json(updatedPost);

    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
}