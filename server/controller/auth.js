const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.js");
const { getFile, uploadFile } = require("../cloud/utils.js");

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password,
            picturePath, friends, location, occupation } = req.body;



        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, password: passHash,
            picturePath, friends, location, occupation, viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save();
        let url = 'https://sociopedia.s3.us-east-005.backblazeb2.com/image.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=0052c4efc5df2780000000004%2F20231110%2Fus-east-005%2Fs3%2Faws4_request&X-Amz-Date=20231110T162755Z&X-Amz-Expires=900&X-Amz-Signature=90051ce913a4ad597f6163159e0fbc030322fa9b23989c49ec252200aafbea7e&X-Amz-SignedHeaders=host&x-id=PutObject';
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

        console.log("object");
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid User Credentials" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password;

        let url;
        url = await getFile(user._id);
        console.log(user);
        return res.status(200).json({ token, user, userPhoto: url, success: true })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message })
    }
}

module.exports = { register, login };