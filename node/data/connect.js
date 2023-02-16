const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/node')
  .then(() => {
    console.log('数据库创建成功！')
  })
  .catch(err => {
    console.log('数据库创建失败！', err, 'test')
  })
//test
module.exports = mongoose
