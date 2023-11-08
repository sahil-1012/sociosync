const mongoose = require("mongoose");

const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    }).catch((error) => console.log("Error connecting to Mongoose" + error));

    let gfs;
    mongoose.connection.once('open', () => {
        gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads"
        });
    });
};

module.exports = dbConnection;
