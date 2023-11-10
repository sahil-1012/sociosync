const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, unique: true, required: true, min: 2, max: 50 },
    password: { type: String, required: true, min: 5, max: 50 },
    friends: { type: Array, default: [] },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
