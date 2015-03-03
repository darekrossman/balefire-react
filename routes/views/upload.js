/**
 * Handle a multipart POST request (for uploading files)
 * Uploads directly to AWS S3 bucket.
 *
 * drossman
 */

var path = require('path');
var multipart = require('co-multipart');
var _fs = require('fs');

var AWS = require('aws-sdk');

AWS.config.update({accessKeyId: 'AKIAI5GCQBITXD4ABPZQ', secretAccessKey: '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'});
var s3Stream = require('s3-upload-stream')(new AWS.S3());

module.exports = function(app) {
  app.post('/balefire/api/upload', function *(next){
    var parts = yield* multipart(this);  
    this.body = yield parts.files.map(upload);
  });
}



/////////////////////

function *upload (file) {
  var read = _fs.createReadStream(file.path);
  var upload = s3Stream.upload({
    Bucket: "vpdms-media-us",
    Key: 'user-media/' + file.filename,
    ACL: "public-read",
    ContentType: file.mimeType
  });

  var promise = new Promise(function(resolve, reject){
    // Handle errors. 
    console.log('promise!')
    upload.on('error', function (error) {
      console.log(error)
      reject(error)
    });
     
    /* Handle progress. Example details object:
       { ETag: '"f9ef956c83756a80ad62f54ae5e7d34b"',
         PartNumber: 5,
         receivedSize: 29671068,
         uploadedSize: 29671068 }
    */
    upload.on('part', function (details) {
      console.log(details);
    });
     
    /* Handle upload completion. Example details object:
       { Location: 'https://bucketName.s3.amazonaws.com/filename.ext',
         Bucket: 'bucketName',
         Key: 'filename.ext',
         ETag: '"bf2acbedf84207d696c8da7dbb205b9f-5"' }
    */
    upload.on('uploaded', function (details) {
      console.log(details)
      resolve({filepath: details.Location, filename: file.filename})
    });
  });

  read.pipe(upload);

  return promise;
}
