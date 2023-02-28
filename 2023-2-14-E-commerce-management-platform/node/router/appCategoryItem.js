const express = require('express');
const appCategoryItem = express.Router();

appCategoryItem.get('/list', require('./appCategoryItem/getList'))

appCategoryItem.post('/:id/delete', require('./appCategoryItem/postIdDelete'))

appCategoryItem.post('/', require('./appCategoryItem/post'))

module.exports = appCategoryItem