const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const S3 = new AWS.S3({
    region:'ap-south-1',
    Bucket:'daksh-s3'
});

var upload = multer({
    storage:multerS3({
        s3: S3,
        bucket:'daksh-s3',
        acl:'public-read',
        metadata: function(req,file,cb){
            cb(null,{fieldName: file.fieldname});
        },
        key: function(req,file,cb){
            cb(null,Date.now().toString() + file.originalname)
        }
    })
});

module.exports = uploads;