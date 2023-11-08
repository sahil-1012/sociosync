const mongoose = require("mongoose");
const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
        });
    } catch (err) {
        console.log(err);
        setTimeout(dbConnection, retryIntervalMs);
    }
};

module.exports = dbConnection;
