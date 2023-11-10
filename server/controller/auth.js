const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.js");
const { getFile, uploadFile } = require("../cloud/utils.js");

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password,
            picturePath, friends, location, occupation } = req.body;

        console.log(firstName, lastName, email, password)
        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, password: passHash,
            picturePath, friends, location, occupation, viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save();
        let url;
        if (savedUser) {
            url = await uploadFile(savedUser._id)
        }
        console.log(url)

        res.status(201).json({ savedUser, url, success: true });

    } catch (err) {
        console.log(err.message);
        res.status(201).json({ error: err.message });
    }
}

//  *****  LOGGING IN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid User Credentials" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password;

        let url;
        if (user.picture.length > 0) {
            url = await getFile(picture);
        }

        return res.status(200).json({ token, user, userPhoto: url, success: true })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message })
    }
}

module.exports = { register, login };