const express = require('express');
const manager = express.Router();

manager.get('/:page', require('./manager/getPage'))

manager.post('/', require('./manager/post'))

manager.post('/:id', require('./manager/postId'))

manager.post('/:id/delete', require('./manager/postIdDelete'))

manager.post('/:id/update_status', require('./manager/postIdUpdateStatus'))

module.exports = manager