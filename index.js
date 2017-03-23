var express = require('express');
var path = require('path');
var fileUpload = require('express-fileupload');

app = express();
app.use(fileUpload());

app.post('/api/upload', function (req, res) {

	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
	var imageFile = req.files.imageFile;

	// Use the mv() method to place the file somewhere on your server 
	imageFile.mv(path.join(__dirname + '/fileUpload/' + req.files.imageFile.name), function(err) {
		if (err) {
			return res.status(500).send(err);
		}

		res.send('File uploaded!');
	});
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(1234);