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

const app = express();
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
    next();
});

app.use(cors())
// MONGOOSE SETUP
const PORT = process.env.PORT || 4001
dbConnection();

app.listen(PORT, () => {
    console.log("Listening on: http://localhost:" + PORT);
});



/* // ~ ROUTES WITH FILES */
// app.get('/users/image/:userId', async (req, res) => {
    //     try {
        //         const { userId } = req.params;
        //         const user = await User.findById(userId).select('picture');
        
        //         if (!user) {
            //             return res.status(404).json({ message: 'User not found' });
            //         }
            
            //         if (!user.picture) {
                //             return res.status(404).json({ message: 'User does not have a picture' });
//         }

//         res.contentType('image/jpeg').send(user.picture);
//     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // });
    
    // app.get('/files/:filename', (req, res) => {
        //     gfs.photos.findOne({ filename: req.params.filename }, (err, file) => {
            //         // Check if file
            
            //         console.log(file)
            //         if (!file || file.length === 0) {
                //             return res.status(404).json({
                    //                 err: 'No file exists'
                    //             });
//         }
//         // File exists
//         return res.json(file);
//     });
// });

// app.use("/", startRoutes)
app.use("/posts", postRoutes)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/comment", commentRoutes)