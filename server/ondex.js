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

const methodOverride = require('method-override');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const util = require("util");

/* CONFIGURATION */
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
configDotenv.config();

const app = express();
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

app.use(cors())
app.use(express.json())
// app.use(express.json({ limit: "30mb", extended: true }))
// app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));



// MONGOOSE SETUP
const PORT = process.env.PORT || 6001
const mongoUrl = process.env.MONGO_URL
dbConnection();


// app.use("/assets", express.static(path.join(__dirname, 'public/assets')))
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/assets")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })



// const storage = new GridFsStorage({
//     url: mongoUrl,
//     file: (req, file) => {
//         if (file.mimetype.startsWith('image/')) {
//             console.log(file)
//             return {
//                 bucketName: 'photos',
//                 filename: file.originalname,
//             };
//         }
//         return null;
//     }
// });

// const upload = multer();

app.listen(PORT, () => {
    console.log("Listening on: http://localhost:" + PORT);
});



// app.use("/", (req, res) => {
//     res.send("Welcome to sociopedia Server");
// });

app.use("/auth", authRoutes)
app.use("/users", userRoutes)

/* // ~ ROUTES WITH FILES */
// app.post("/auth/register",  register)

app.post('/auth/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, friends, location, occupation, pic } = req.body;

        console.log(pic===null)
        // Your registration logic...
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});









// app.post('/auth/register', async (req, res) => {
//     try {
//         const { firstName, lastName, email, password, friends, location, occupation, pic } = req.body;
//         console.log(req.body)

//         const base64Image = pic.replace(/^data:image\/\w+;base64,/, '');
//         const buffer = Buffer.from(base64Image, 'base64');
//         console.log(buffer)




//         const salt = await bcrypt.genSalt();
//         const passHash = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password: passHash,
//             picture: {
//                 data: req.file.buffer,  // Store the binary data of the image
//                 contentType: req.file.mimetype,  // Set the content type of the image
//             },
//             friends,
//             location,
//             occupation,
//             viewedProfile: Math.floor(Math.random() * 10000),
//             impressions: Math.floor(Math.random() * 10000),
//         });

//         await newUser.save();

//         res.status(200).json(newUser);
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json({ error: 'An error occurred while registering the user' });
//     }
// });

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


// app.post("/posts", verifyToken, upload.single('picture'), createPost)
app.post("/posts", verifyToken, createPost)
app.use("/posts", postRoutes)
app.use("/comment", commentRoutes)