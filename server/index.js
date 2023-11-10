const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");
const configDotenv = require("dotenv");
const multer = require("multer");
const dbConnection = require("./connections/dbConnect");
// const diskStorage = require("multer").diskStorage;
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const commentRoutes = require("./routes/comment.js");
const { verifyToken } = require("./middleware/auth.js");
const { register } = require("./controller/auth.js");
const { createPost } = require("./controller/post.js");
const User = require("./models/users.js");

/* CONFIGURATION */
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
configDotenv.config();

// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

const app = express();
app.use(express.json())
app.use(cors())

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001
dbConnection();
app.listen(PORT, () => {
    console.log("Listening on: http://localhost:" + PORT);
});

// app.use("/", (req, res) => {
//     res.send("Welcome to sociopedia Server");
// });

app.use("/auth", authRoutes)
app.use("/users", userRoutes)

/* // ~ ROUTES WITH FILES */
app.get('/users/image/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('picture');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.picture) {
            return res.status(404).json({ message: 'User does not have a picture' });
        }

        res.contentType('image/jpeg').send(user.picture);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/files/:filename', (req, res) => {
    gfs.photos.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file

        console.log(file)
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // File exists
        return res.json(file);
    });
});

app.post("/posts", verifyToken, createPost)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/comment", commentRoutes)
app.use("/posts", postRoutes)
// app.post("/posts", verifyToken, createPost)

