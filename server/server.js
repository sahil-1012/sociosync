const { S3Client, PutObjectCommand, GetObjectCommand, PutBucketCorsCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const configDotenv = require("dotenv");
configDotenv.config();

const ENDPOINT = process.env.B2_ENDPOINT
const ACCESS_KEY_ID = process.env.B2_ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.B2_SECRET_ACCESS_KEY
const REGION = process.env.B2_REGION


const s3 = new S3Client({
    endpoint: ENDPOINT,
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
    }
});

async function uploadFile() {
    try {

        const command = new PutObjectCommand({
            Bucket: 'sociopedia',
            Key: 'image.jpeg',
            ContentType: 'image/jpeg',
        });

        const url = await getSignedUrl(s3, command);
        console.log(url)
        return url;

    } catch (err) {
        console.log("Error: ", err);
    }
}

// Call the function
uploadFile().catch(err => console.error(err));
