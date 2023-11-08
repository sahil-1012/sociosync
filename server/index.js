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
const GridFsStorage = require('multer-gridfs-storage');



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




// MONGOOSE SETUP
const PORT = process.env.PORT || 6001
dbConnection();
app.listen(PORT, () => {
    console.log("Listening on: http://localhost:" + PORT);
});


// app.use("/assets", express.static(path.join(__dirname, 'public/assets')))
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/assets")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })

// // create storage engine
// const storage = new GridFsStorage({
//     url: process.env.MONGO_URL,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             // encrypt filename before storing it
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 } const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'uploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });

// const upload = multer({ storage });


// app.use("/", (req, res) => {
//     res.send("Welcome to sociopedia Server");
// });

app.use("/auth", authRoutes)
app.use("/users", userRoutes)


/* // ~ ROUTES WITH FILES */
// app.post("/auth/register",  register)

// app.post('/auth/register', async (req, res) => {
//     try {
//         const { firstName, lastName, email, password,
//             picturePath, friends, location, occupation, picture } = req.body;

//         console.log(req.body)
//         const salt = await bcrypt.genSalt();
//         const passHash = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             firstName, lastName, email, password: passHash,
//             picturePath, friends, location, occupation, viewedProfile: Math.floor(Math.random() * 10000),
//             impressions: Math.floor(Math.random() * 10000),
//             picture: Buffer.from(picture, 'base64'), // Convert the base64 image to binary data
//         });

//         await newUser.save();
//         console.log(newUser)

//         res.status(200).json(newUser);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while registering the user' });
//     }
// });



// app.post("/posts", verifyToken, upload.single('picture'), createPost)
app.post("/posts", verifyToken, createPost)
app.use("/posts", postRoutes)
app.use("/comment", commentRoutes)