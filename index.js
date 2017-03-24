var express = require('express');
var path = require('path');
var fileUpload = require('express-fileupload');
var s3Client = require('./s3');
var fileManager = new s3Client();

app = express();
app.use(fileUpload());

app.post('/api/upload', function (req, res) {

	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	var imageFile = req.files.imageFile;
	fileManager.upload(imageFile, function (err, resObj) {
		if (err) {
			res.send(err);
		}

		res.json(resObj);
	});
});

app.get('/api/read/:fileName', function (req, res) {
	fileManager.readFile(req.params.fileName, function (err, resObj) {
		res.setHeader('content-type', 'image');
		res.send(resObj);
	});
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(1234);