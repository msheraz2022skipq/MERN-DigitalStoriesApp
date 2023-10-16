const { S3Client, CreateBucketCommand, HeadBucketCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create bucket if it doesn't exist
// async function createBucketIfNotExists() {
//   try {
//     await s3.send(new HeadBucketCommand({ Bucket: process.env.BUCKET_NAME }));
//   } catch (err) {
//     if (err.statusCode === 404) {
//       await s3.send(new CreateBucketCommand({ Bucket: process.env.BUCKET_NAME }));
//     } else {
//       console.error(err);
//     }
//   }
// }

// createBucketIfNotExists();

function generateFileName(originalName) {
    const extension = path.extname(originalName);
    const sanitizedFileName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
    return `${Date.now().toString()}-${sanitizedFileName}${extension}`;
  }

// Upload middleware
exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // acl: 'public-read',
    contentDisposition: 'inline',
    contentEncoding: 'base64',
    metadata: function (req, file, cb) {
      cb(null, { 'Content-Type': file.mimetype });
    },
   key: function (req, file, cb) {
     const author = req.body.author;
     const fileType = path.extname(file.originalname);
     const folder = (fileType === '.mp4') ? 'videos'   : 'images';
     const key = `${author}/${folder}/${generateFileName(file.originalname)}`;
     cb(null, key);
   },
 }),
 });
 


