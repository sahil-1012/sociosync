import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: { type: Map, of: Boolean },
    comments: [{
        user: { type: String, required: true },
        message: { type: String, required: true, },
        timestamp: { type: Date, default: Date.now, },
    }],

}, { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
