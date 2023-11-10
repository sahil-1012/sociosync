const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


const b2 = new S3Client({
    endpoint: 'https://s3.us-east-005.backblazeb2.com',
    region: 'us-east-005',
    credentials: {
        accessKeyId: '0052c4efc5df2780000000004',
        secretAccessKey: 'K005MUdJONxXGp2d0Vel2hr0TAe1z38'
    }
});

module.exports = { b2 }