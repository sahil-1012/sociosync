import Post from '../models/post.js';
import User from '../models/users.js';


// CREATE
export const createPost = async (req, res, next) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId)
        console.log(userId, description, picturePath)
        const newPost = new Post({
            userId, description, picturePath,
            firstName: user.firstName, lastName: user.lastName,
            location: user.location, userPicturePath: user.picturePath,
            likes: {},
        })

        await newPost.save();


        const posts = await Post.find().sort({ createdAt: -1 });
        // const post = await Post.find()
        res.status(201).json(posts)


    } catch (err) {
        console.log(err.message)
        return res.status(409).json({ message: err.message });
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 });;
        return res.status(200).json(post)

    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res,) => {
    try {
        const { userId } = req.body;
        const posts = await User.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

// UPDATE
export const likePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(postId);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, { likes: post.likes }, { new: true })
        res.status(200).json(updatedPost);

    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
}