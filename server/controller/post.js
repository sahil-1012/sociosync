const Post = require('../models/post.js');
const User = require('../models/users.js');
const { uploadFile } = require("../cloud/utils.js");
const { v4: uuidv4 } = require('uuid');
// CREATE
const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId)
        const newPost = new Post({
            firstName: user.firstName, lastName: user.lastName,
            userId, description, picturePath,
            location: user.location, likes: {},
        })

        await newPost.save();

        const posts = await Post.find().sort({ createdAt: -1 });
        // const post = await Post.find()
        res.status(201).json({ posts, success: true })

    } catch (err) {
        console.log(err.message)
        return res.status(409).json({ message: err.message });
    }
}

const createPhotoUrl = async (req, res) => {
    try {
        const contentType = 'image/jpeg'
        const unique = uuidv4()
        const key = `posts/${unique}`;
        key
        const url = await uploadFile(key, contentType);
        res.status(201).json({ url, unique, success: true })

    } catch (err) {
        console.log(err.message)
        return res.status(409).json({ message: err.message });
    }
}

// READ
const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        const formattedPosts = await Promise.all(posts.map(async (post) => {
            const likesObject = Object.fromEntries(post.likes);

            // Map over the comments for the current post and add the username to each comment
            const formattedComments = await Promise.all(post.comments.map(async (comment) => {
                const user = await User.findById(comment.userId).select('-picture');
                if (user) {
                    return {
                        ...comment.toObject(),
                        username: user.firstName + ' ' + user.lastName,
                    };
                }
            }));

            formattedComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            return {
                ...post.toObject(),
                likes: likesObject, // Include the 'likes' as a plain object
                comments: formattedComments,
            };

        }).sort((a, b) => b.createdAt - a.createdAt));

        return res.status(200).json(formattedPosts)

    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}


const getUserPosts = async (req, res,) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).sort({ createdAt: -1 });

        const formattedPosts = await Promise.all(posts.map(async (post) => {
            const likesObject = Object.fromEntries(post.likes);

            // Map over the comments for the current post and add the username to each comment
            const formattedComments = await Promise.all(post.comments.map(async (comment) => {
                const user = await User.findById(comment.userId);
                return {
                    ...comment.toObject(),
                    username: user.firstName + ' ' + user.lastName,
                };
            }));

            formattedComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            return {
                ...post.toObject(),
                likes: likesObject, // Include the 'likes' as a plain object
                comments: formattedComments,
            };

        }).sort((a, b) => b.createdAt - a.createdAt));

        return res.status(200).json(posts);
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

// UPDATE
const likePost = async (req, res, next) => {
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
        const updatedPost = await Post.findByIdAndUpdate(postId, { likes: post.likes }, { new: true });

        // Convert the 'likes' Map to a plain JavaScript object
        const likesObject = Object.fromEntries(updatedPost.likes);

        const commentUserPromises = updatedPost.comments.map(async (comment) => {
            const user = await User.findById(comment.userId).select('-picture');
            return {
                ...comment.toObject(),
                username: user.firstName + ' ' + user.lastName,
            };
        });

        const formattedComments = await Promise.all(commentUserPromises);

        formattedComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        const responsePost = {
            ...updatedPost.toObject(),
            likes: likesObject, // Include the 'likes' as a plain object
            comments: formattedComments,
        };

        console.log(responsePost.likes);
        res.status(200).json(responsePost);
        // Send the response directly as the responsePost object

    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}


module.exports = { createPost, createPhotoUrl, getFeedPosts, getUserPosts, likePost };
