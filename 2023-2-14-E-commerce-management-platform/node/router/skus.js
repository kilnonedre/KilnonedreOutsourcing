const express = require('express');
const skus = express.Router();

skus.post('/', require('./skus/post'))

skus.post('/delete_all', require('./skus/postDeleteAll'))

skus.post('/:id', require('./skus/postId'))

skus.get('/:page', require('./skus/getPage'))

skus.post('/:id/update_status', require('./skus/postIdUpdateStatus'))

module.exports = skus