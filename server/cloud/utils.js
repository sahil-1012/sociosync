const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { b2 } = require("./connect");
const bucketName = 'sociopedia'
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

const params = {
    Bucket: bucketName,
    CORSConfiguration: corsConfiguration,
};

async function getFile(key) {
    const fileName = key + '.jpeg';

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
    }, params);
    const url = await getSignedUrl(b2, command, { expiresIn: 1800 });
    return url;
}

async function uploadFile(key, contentType) {
    const fileName = key + '.jpeg';

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: contentType
    });
    const url = await getSignedUrl(b2, command);
    return url;
}

module.exports = { getFile, uploadFile }