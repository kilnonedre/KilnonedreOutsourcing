const express = require('express');
const goods = express.Router();
const { createToken, verifyToken, checkUser } = require('../api/function')
const con = require('../data/mysqlConnect')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
require('moment/locale/zh-cn')

goods.post('/', require('./goods/post'))

goods.get('/:page', require('./goods/getPage'))

goods.post('/changestatus', require('./goods/postChangestatus'))

goods.post('/delete_all', require('./goods/postDeleteAll'))

goods.post('/banners/:id', require('./goods/postBannersId'))

goods.get('/read/:id', require('./goods/getReadId'))

goods.post('/:id', require('./goods/postId'))

goods.post('/updateskus/:id', require('./goods/postUpdateskusId'))

module.exports = goods