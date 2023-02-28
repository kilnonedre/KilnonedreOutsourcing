const express = require('express');
const image = express.Router();

image.post('/upload', require('./image/postUpload'))

image.post('/delete_all', require('./image/postDeleteAll'))

image.post('/:id', require('./image/postId'))

module.exports = image