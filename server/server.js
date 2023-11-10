const { S3Client, PutObjectCommand, GetObjectCommand, PutBucketCorsCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuid } = require('uuid');


const s3 = new S3Client({
    endpoint: 'https://s3.us-east-005.backblazeb2.com',
    region: 'us-east-005',
    credentials: {
        accessKeyId: '0052c4efc5df2780000000004',
        secretAccessKey: 'K005MUdJONxXGp2d0Vel2hr0TAe1z38'
    }
});


const corsConfiguration = {
    CORSRules: [
        {
            AllowedOrigins: ['*'],
            AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE'],
            AllowedHeaders: ['*'],
            MaxAgeSeconds: 3000,
        },
    ],
};

const corsParams = {
    Bucket: 'sociopedia',
};


async function uploadFile() {
    try {

        // const corsCommand = new PutBucketCorsCommand(corsParams);
        // await s3.send(corsCommand);


        // const command = new GetObjectCommand({
        //   Bucket: 'sociopedia',
        //   Key: 'image2.jpg',
        //   ContentType: 'image/jpg'
        // });

        const command = new PutObjectCommand({
            Bucket: 'sociopedia',
            Key: 'image.jpeg',
            ContentType: 'image/jpeg',
        });

        const url = await getSignedUrl(s3, command);
        console.log(url)
        return url;

        // console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    } catch (err) {
        console.log("Error: ", err);
    }
}

// Call the function
uploadFile().catch(err => console.error(err));
