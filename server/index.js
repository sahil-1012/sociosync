const express = require("express");

const cors = require("cors");
const configDotenv = require("dotenv");

const startRoutes = require("./routes/startRoutes.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const commentRoutes = require("./routes/comment.js");

const dbConnection = require("./connections/dbConnect");

configDotenv.config();
const PORT = process.env.PORT || 4001

const app = express();
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
    next();
});


dbConnection();

app.listen(PORT, () => {
    console.log("Listening on: http://localhost:" + PORT);
});

app.use("/posts", postRoutes)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/comment", commentRoutes)