var s3BrowserDirectUpload = require('s3-browser-direct-upload');
var AWS = require('aws-sdk')
var config = require('./config');

function s3Client() {
	var _this = this;
}

s3Client.prototype.upload = function (file, callback) {
	var _this = this;
	var allowedTypes = ['jpg', 'png'];
	var client = new s3BrowserDirectUpload(config.s3clientOptions, allowedTypes);

	var uploadOptions = {
	  data: file.data,
	  key: _this.fileName(file.name),
	  bucket: config.bucketName
	};

	client.upload(uploadOptions, function(err, url) {
	  var resObj = {
	  	s3url: url,
	 	imageUrl: '/api/read/' + _this.fileName(file.name),
	  	fileName: _this.fileName(file.name)
	  };

	  if (err) {
	  	callback(err);
	  }

	  callback('', resObj);
	});
};

s3Client.prototype.readFile = function (fileName, callback) {
	var s3 = new AWS.S3(config.s3clientOptions);
	// AWS.config.loadFromPath(config.s3clientOptions);
	s3.getObject({Bucket: config.bucketName, Key: fileName}, function (err, data) {
		if (err) {
			callback(err);
		}

		callback('', data.Body);
	});
};

s3Client.prototype.fileName = function (fileName) {
	var unix = Math.round(+new Date()/1000);
	return unix+fileName;
};

module.exports = s3Client;