const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { b2 } = require("./connect");
const bucketName = 'sociopedia'


async function getFile(key) {
    const fileName = key + '.jpeg';

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
    });
    const url = await getSignedUrl(b2, command);
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