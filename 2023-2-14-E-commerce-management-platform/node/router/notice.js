const express = require('express');
const notice = express.Router();

notice.post('/', require('./notice/post'))

notice.get('/:page', require('./notice/getPage'))

notice.post('/:id', require('./notice/postId'))

notice.post('/:id/delete', require('./notice/postIdDelete'))

module.exports = notice