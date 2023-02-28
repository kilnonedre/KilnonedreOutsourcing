const express = require('express');
const coupon = express.Router();

coupon.post('/', require('./coupon/post'))

coupon.get('/:page', require('./coupon/getPage'))

coupon.post('/:id', require('./coupon/postId'))

coupon.post('/:id/delete', require('./coupon/postIdDelete'))

coupon.post('/:id/update_status', require('./coupon/postIdUpdateStatus'))

module.exports = coupon