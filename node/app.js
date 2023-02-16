const express = require('express')
const app = express()
const { Node } = require('./data/Node')
const { User } = require('./data/User')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

require('./data/connect')
require('./data/Node')
require('./data/User')

app.get('/nodeList', async (req, res) => {
  const node = await Node.find(req.query)
  res.send(node)
})

app.post('/node', async (req, res) => {
  const node = new Node(req.body)
  node.save()
  const data = await Node.find({ username: req.body.username })
  res.send(data)
})

app.post('/scheduleChange', async (req, res) => {
  function format(date) {
    if (!date) return
    var date2 = new Date(date)
    var y = date2.getUTCFullYear()
    var m = date2.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date2.getDate()
    d = d < 10 ? '0' + d : d
    var h = date2.getHours()
    h = h < 10 ? '0' + h : h
    var minute = date2.getMinutes()
    minute = minute < 10 ? '0' + minute : minute
    var seconds = date2.getSeconds() //获取当前毫秒数（0 - 999）
    seconds = seconds < 10 ? '0' + seconds : seconds
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + seconds
  }
  if (req.body.schedule == 100) {
    let t = new Date().getTime() // 当前时间戳
    let time = format(t)
    let isDone = 1
    await Node.updateOne(
      { _id: req.body._id },
      {
        $set: {
          schedule: req.body.schedule,
          isDone: isDone,
          finishedTime: time
        }
      }
    )
  } else
    await Node.updateOne(
      { _id: req.body._id },
      { $set: { schedule: req.body.schedule } }
    )
  const node = await Node.find({ username: req.body.username })
  res.send(node)
})

app.post('/isDoneChange', async (req, res) => {
  let data = 1
  await Node.updateOne(
    { _id: req.body._id },
    { $set: { isDone: data, finishedTime: req.body.finishedTime } }
  )
  const node = await Node.find({ username: req.body.username })
  res.send(node)
})

app.post('/itemDelete', async (req, res) => {
  await Node.remove({ _id: req.body._id })
  const node = await Node.find({ username: req.body.username })
  res.send(node)
})

app.post('/searchItem', async (req, res) => {
  const node = await Node.find({ username: req.body.username })
  res.send(
    node.filter(data => {
      return data.title.includes(req.body.partTitle)
    })
  )
})

app.post('/user', async (req, res) => {
  const node = await User.find({ userEmail: req.body.userEmail })
  if (!node.length) {
    const newUser = new User(req.body)
    newUser.save()
    res.send(req.body)
  }
  if (node.length) {
    if (node[0].userPassword == req.body.userPassword) res.send(node)
    else res.send('密码错误')
  }
})

app.post('/updata', async (req, res) => {
  await User.updateOne(
    { userEmail: req.body.userEmail },
    { $set: { userPassword: req.body.userPassword } }
  )
  res.send('修改成功')
})

app.listen(3000)
console.log('succeed')
