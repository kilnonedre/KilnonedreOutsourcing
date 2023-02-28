var mysql = require('mysql')
var mysqlUserData = require('./mysqlUserData')

var con = mysql.createConnection(mysqlUserData)

module.exports = con