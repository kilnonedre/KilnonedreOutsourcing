const express = require('express');
const category = express.Router();

category.post('/', require('./category/post'))

category.get('/', require('./category/getPage'))

category.post('/:id', require('./category/postId'))

category.post('/:id/delete', require('./category/postIdDelete'))

category.post('/:id/update_status', require('./category/postIdUpdateStatus'))

module.exports = category