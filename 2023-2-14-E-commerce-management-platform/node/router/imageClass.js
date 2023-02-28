const express = require('express');
const imageClass = express.Router();

imageClass.post('/', require('./imageClass/post'))

imageClass.get('/:page', require('./imageClass/getPage'))

imageClass.post('/:id', require('./imageClass/postId'))

imageClass.post('/:id/delete', require('./imageClass/postIdDelete'))

imageClass.get('/:id/image/:page', require('./imageClass/getIdImagePage'))

module.exports = imageClass