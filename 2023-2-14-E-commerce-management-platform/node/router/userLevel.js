const express = require('express');
const userLevel = express.Router();

userLevel.post('/', require('./userLevel/post'))

userLevel.get('/:page', require('./userLevel/getPage'))

userLevel.post('/:id', require('./userLevel/postId'))

userLevel.post('/:id/delete', require('./userLevel/postIdDelete'))

userLevel.post('/:id/update_status', require('./userLevel/postIdUpdateStatus'))

module.exports = userLevel