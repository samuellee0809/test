var s3BrowserDirectUpload = require('s3-browser-direct-upload');
var config = require('./config');

function s3Client() {
	console.log('CONSTRUCTOR');
}

s3Client.prototype.client = function (filename) {
	var allowedTypes = ['jpg', 'png'];
	var client = new s3BrowserDirectUpload(config.s3clientOptions, allowedTypes);

	var uploadPostFormOptions = {
	  key: filename,
	  bucket: config.bucketName
	}

	client.uploadPostForm(uploadPostFormOptions, function(err, params){
	  if (err) {
	  	console.log(err);
	  }

	  console.log(params);

	});
};

module.exports = s3Client;