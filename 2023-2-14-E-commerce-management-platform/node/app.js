//express_demo.js 文件
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static(__dirname))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

require('./data/adminLogin')
require('./data/pageStatisticsFir')
require('./data/pageStatisticsSec')
require('./data/pageStatisticsThi')
require('./data/adminCommodity')
require('./data/administratorList')
require('./data/administratorRole')
require('./data/imageCategoryList')
require('./data/imageList')
require('./data/announcementList')
require('./data/skusList')
require('./data/voucherList')
require('./data/commodityCategory')
require('./data/productList')
require('./data/userList')
require('./data/membershipLevel')
require('./data/systemConfiguration')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/admin/login', require('./router/tools/login'))
app.post('/admin/getinfo', require('./router/tools/getinfo'))
app.get('/admin/statistics1', require('./router/tools/statistics1'))
app.get('/admin/statistics2', require('./router/tools/statistics2'))
app.get('/admin/statistics3', require('./router/tools/statistics3'))
app.post('/admin/updatepassword', require('./router/tools/updatepassword'))
app.post('/admin/logout', require('./router/tools/logout'))
app.use('/admin/manager', require('./router/manager'))
app.use('/admin/image_class', require('./router/imageClass'))
app.use('/admin/image', require('./router/image'))
app.use('/admin/notice', require('./router/notice'))
app.use('/admin/skus', require('./router/skus'))
app.use('/admin/coupon', require('./router/coupon'))
app.use('/admin/category', require('./router/category'))
app.use('/admin/user', require('./router/user'))
app.use('/admin/user_level', require('./router/userLevel'))
app.use('/admin/app_category_item', require('./router/appCategoryItem'))
app.use('/admin/goods', require('./router/goods'))
app.use('/admin/sysconfig', require('./router/sysconfig'))

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
