import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/users.js"


export const register = async (req, res) => {
    try {
        console.log("first")
        console.log(req.body)
        const { firstName, lastName, email, password,
            picturePath, friends, location, occupation } = req.body;

        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password, salt);

        console.log(passHash)

        const newUser = new User({
            firstName, lastName, email, password: passHash,
            picturePath, friends, location, occupation, viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);

    } catch (err) {
        console.log(err.message);
        res.status(201).json({ error: err.message });
    }
}

//  *****  LOGGING IN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = User.findOne({ email })
        console.log(email, password)
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid User Credentials" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password

        return res.status(200).json({ token, user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}