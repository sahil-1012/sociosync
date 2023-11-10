const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");
const configDotenv = require("dotenv");
const multer = require("multer");
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
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
configDotenv.config();

const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));



app.use("/assets", express.static(path.join(__dirname, 'public/assets')))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer();

app.listen(PORT, () => {
    console.log("Listening on: http://localhost:" + PORT);
});

/* // ~ ROUTES WITH FILES */
app.post("/auth/register", upload.single('picture'), register)