import mongoose from "mongoose";
import express from "express";

import cors from "cors";
import configDotenv from "dotenv";
import multer, { diskStorage } from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";


import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { register } from "./controller/auth.js";
import { createPost } from "./controller/post.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
configDotenv.config();

const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

app.use(express.json())
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))


app.use(cors())




// MONGOOSE SETUP
const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log("Server Port: " + PORT))
}).catch((error) => console.log("Error connecting to Mongoose" + error));



app.use("/assets", express.static(path.join(__dirname, 'public/assets')))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });

/* // ~ ROUTES WITH FILES */
app.post("/auth/register", register)
app.post("/posts", verifyToken, upload.single('picture'), createPost)


app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)