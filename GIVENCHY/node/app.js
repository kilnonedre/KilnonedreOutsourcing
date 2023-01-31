const express = require('express')
const path = require('path')
const app = express()
const { Carousel } = require('./data/Carousel')
const { ReinforcementDesign } = require('./data/ReinforcementDesign')
const { FieldExample } = require('./data/FieldExample')
const { NewDesign } = require('./data/NewDesign')
const {
  ReinforcementConstruction,
} = require('./data/ReinforcementConstruction')
const {
  ReinforcementDesignAndConstruction,
} = require('./data/ReinforcementDesignAndConstruction')
const { NewConstruction } = require('./data/NewConstruction')
const { AdminDatePicker } = require('./data/AdminDatePicker')
const { CompanyIntroduction } = require('./data/CompanyIntroduction')
const { WorkIntroduction } = require('./data/WorkIntroduction')
const { User } = require('./data/User')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const ejs = require('ejs')
//2.创建web服务器

app.use(express.static('dist'))
app.set('views', 'dist') //设置视图的对应目录
app.set('view engine', 'ejs') //设置默认的模板引擎
app.engine('ejs', ejs.__express) //定义模板引擎

app.get('/', (req, res) => {
  res.render('index')
})

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
    /*让options请求快速返回*/
    res.sendStatus(200)
  } else {
    next()
  }
})

require('./data/connect')
require('./data/User')
require('./data/ReinforcementDesign')
require('./data/Carousel')
require('./data/FieldExample')
require('./data/NewDesign')
require('./data/ReinforcementConstruction')
require('./data/ReinforcementDesignAndConstruction')
require('./data/NewConstruction')
require('./data/AdminDatePicker')
require('./data/WorkIntroduction')
require('./data/CompanyIntroduction')

// app.use(express.static(path.join(__dirname)))

const fs = require('fs-extra')
const formidable = require('formidable')

app.post('/upload-avatar', (req, res) => {
  // console.log(path.join(__dirname, 'img'))
  let imgpath = path.join(__dirname, 'dist', 'img')
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: imgpath,
    keepExtensions: true,
  })
  form.parse(req, async (err, fields, file) => {
    const carousel = new Carousel({
      content: path.join(
        'img',
        file.inputFile.filepath.split('img')[1].substr(1)
      ),
    })
    carousel.save()
  })
  // res.send('ok')
})
app.post('/upload-avatar-example', (req, res) => {
  // console.log(path.join(__dirname, 'img'))
  let imgpath = path.join(__dirname, 'dist', 'imgs')
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: imgpath,
    keepExtensions: true,
  })
  form.parse(req, async (err, fields, file) => {
    const carousel = new FieldExample({
      url: path.join(
        'imgs',
        file.inputFile.filepath.split('imgs')[1].substr(1)
      ),
    })
    carousel.save()
  })
  // res.send('ok')
})

app.post('/dataChange', async (req, res) => {
  let data = ''
  if (req.body.url == 'reinforcementDesign') {
    data = 'ReinforcementDesign'
    let test = await ReinforcementDesign.find().count()
    const reinforcementDesign = new ReinforcementDesign({
      num: test,
      pro1: req.body.data,
    })
    reinforcementDesign.save()
  } else if (req.body.url == 'newDesign') {
    data = 'NewDesign'
    let test = await NewDesign.find().count()
    const newDesign = new NewDesign({
      num: test,
      pro1: req.body.data,
    })
    newDesign.save()
  } else if (req.body.url == 'reinforcementConstruction') {
    data = 'reinforcementConstruction'

    let test = await ReinforcementConstruction.find().count()
    const reinforcementConstruction = new ReinforcementConstruction({
      num: test,
      pro1: req.body.data,
    })
    reinforcementConstruction.save()
  } else if (req.body.url == 'reinforcementDesignAndConstruction') {
    data = 'ReinforcementDesignAndConstruction'

    let test = await ReinforcementDesignAndConstruction.find().count()
    const reinforcementDesignAndConstruction =
      new ReinforcementDesignAndConstruction({
        num: test,
        pro1: req.body.data,
      })
    reinforcementDesignAndConstruction.save()
  } else if (req.body.url == 'newConstruction') {
    data = 'NewConstruction'

    let test = await NewConstruction.find().count()
    const newConstruction = new NewConstruction({
      num: test,
      pro1: req.body.data,
    })
    newConstruction.save()
  }
  res.send(data)
})

app.get('/home/corsurl', async (req, res) => {
  let data = await Carousel.find().limit(4)
  res.send(data)
})
app.get('/home/FieldExample', async (req, res) => {
  let data = await FieldExample.find()
  res.send(data)
})
app.get('/home/project', async (req, res) => {
  let data = await ReinforcementDesign.find().limit(7)
  res.send(data)
})

app.get('/home/ReinforcementDesign', async (req, res) => {
  let data = await ReinforcementDesign.find()
  res.send(data)
})
app.get('/home/ReinforcementConstruction', async (req, res) => {
  let data = await ReinforcementConstruction.find()
  res.send(data)
})
app.get('/home/ReinforcementDesignAndConstruction', async (req, res) => {
  let data = await ReinforcementDesignAndConstruction.find()
  res.send(data)
})
app.get('/home/NewDesign', async (req, res) => {
  let data = await NewDesign.find()
  res.send(data)
})
app.get('/home/NewConstruction', async (req, res) => {
  let data = await NewConstruction.find()
  res.send(data)
})
app.delete('/admin/deleteImg', async (req, res) => {
  await Carousel.remove({ _id: req.body.id })
  res.send('ok')
})
app.delete('/admin/deleteImg-example', async (req, res) => {
  await FieldExample.remove({ _id: req.body.id })
  res.send('ok')
})
app.delete('/admin/deleteData', async (req, res) => {
  if (req.body.url == 'NewConstruction')
    await NewConstruction.remove({ _id: req.body.id })
  if (req.body.url == 'NewDesign') await NewDesign.remove({ _id: req.body.id })
  if (req.body.url == 'ReinforcementDesignAndConstruction')
    await ReinforcementDesignAndConstruction.remove({ _id: req.body.id })
  if (req.body.url == 'ReinforcementConstruction')
    await ReinforcementConstruction.remove({ _id: req.body.id })
  if (req.body.url == 'ReinforcementDesign')
    await ReinforcementDesign.remove({ _id: req.body.id })
  res.send(req.body.url)
})
app.post('/admin/AdminDatePicker', async (req, res) => {
  const carousel = new AdminDatePicker({
    data: req.body.data,
    introduce: req.body.introduce,
  })
  carousel.save()
  res.send('ok')
})
app.get('/admin/AdminDatePicker', async (req, res) => {
  let data = await AdminDatePicker.find()
  res.send(data)
})

app.delete('/admin/deleteDataAdminDatePicker', async (req, res) => {
  await AdminDatePicker.remove({ _id: req.body.id })
  res.send('ok')
})
app.post('/admin/CompanyIntroduction', async (req, res) => {
  await CompanyIntroduction.remove()
  const carousel = new CompanyIntroduction({
    name: req.body.comName,
    content: req.body.comIntroduce,
  })
  carousel.save()
  res.send('ok')
})
app.post('/admin/WorkIntroduction', async (req, res) => {
  const carousel = new WorkIntroduction({
    title: req.body.workName,
    content: req.body.workHave,
    need: req.body.workNeed,
  })
  carousel.save()
  res.send('ok')
})

app.get('/home/WorkIntroduction', async (req, res) => {
  let data = await WorkIntroduction.find()
  res.send(data)
})

app.get('/home/CompanyIntroduction', async (req, res) => {
  let data = await CompanyIntroduction.find()
  res.send(data)
})

app.delete('/admin/WorkIntroduction-delete', async (req, res) => {
  await WorkIntroduction.remove({ _id: req.body.id })
  res.send('ok')
})
app.post('/User', async (req, res) => {
  if ((await User.find()) == false) {
    console.log(1)
    const carousel = new User({
      num: req.body.zhanghao,
      pro1: req.body.mima,
    })
    carousel.save()
  } else if (req.body.zhanghao == '') {
    console.log(3)

    let t = await User.find()
    t = t[0].num
    await User.deleteOne({ num: t })
    const carousel = new User({
      num: t,
      pro1: req.body.mima,
    })
    carousel.save()
  } else if (req.body.zhanghao != '') {
    console.log(4)
    let t = await User.find({ num: req.body.zhanghao })
    if (t[0].pro1 == req.body.mima) res.send('shenfqueren')
  }
})

app.listen(3001)
console.log('succeed')
