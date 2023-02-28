const express = require('express');
const user = express.Router();

user.post('/', require('./user/post'))

user.get('/:page', require('./user/getPage'))

user.post('/:id', require('./user/postId'))

user.post('/:id/delete', require('./user/postIdDelete'))

user.post('/:id/update_status', require('./user/postIdUpdateStatus'))

module.exports = user