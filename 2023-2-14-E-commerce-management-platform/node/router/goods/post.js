const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
require('moment/locale/zh-cn')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (!req.body.title) {
        req.body.title = ''
    }
    if (!req.body.category_id) {
        req.body.category_id = ''
    }
    if (results.code === 200) {
        const data = moment().format('YYYY-MM-DD HH:mm:ss')
        const adminLogin = "INSERT INTO product_list (id, title, category_id, cover, `desc`, unit, stock, min_stock, status, stock_display, min_price, min_oprice, ischeck, create_time, update_time) VALUES ?"
        const value = [[uuidv4(), req.body.title, req.body.category_id, req.body.cover, req.body.desc, req.body.unit, req.body.stock, req.body.min_stock, req.body.status, req.body.stock_display, req.body.min_price, req.body.min_oprice, Math.floor(Math.random() * 2), data, data]]
        con.query(adminLogin, [value], (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data.id = value[0][0], params.data.title = value[0][1], params.data.category_id = value[0][2], params.data.cover = value[0][3], params.data.desc = value[0][4], params.data.unit = value[0][5], params.data.stock = value[0][6], params.data.min_stock = value[0][7], params.data.status = value[0][8], params.data.stock_display = value[0][9], params.data.min_price = value[0][10], params.data.min_oprice = value[0][11], params.data.ischeck = value[0][12], params.data.create_time = data, params.data.update_time = data) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}