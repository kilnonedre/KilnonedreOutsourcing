const express = require('express');
const sysconfig = express.Router();

sysconfig.get('/', require('./sysconfig/get'))

sysconfig.post('/', require('./sysconfig/post'))

module.exports = sysconfig