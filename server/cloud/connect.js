const { S3Client } = require('@aws-sdk/client-s3');
const configDotenv = require("dotenv");
configDotenv.config();

const ENDPOINT = process.env.B2_ENDPOINT
const ACCESS_KEY_ID = process.env.B2_ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.B2_SECRET_ACCESS_KEY
const REGION = process.env.B2_REGION


const b2 = new S3Client({
    endpoint: ENDPOINT,
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
    }
});

module.exports = { b2 }