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
    if (results.code === 200) {
        const data = moment().format('YYYY-MM-DD HH:mm:ss')
        const adminLogin = "INSERT INTO voucher_list (id, name, type, value, total, used, min_price, start_time, end_time, status, create_time, update_time, `order`, `desc`) VALUES ?"
        const value = [[uuidv4(), req.body.name, req.body.type, req.body.value, req.body.total, Math.round(Math.random() * 100), req.body.min_price, moment(req.body.start_time).format('YYYY-MM-DD HH:mm:ss'), moment(req.body.end_time).format('YYYY-MM-DD HH:mm:ss'), 1, data, data, req.body.order, req.body.desc]]
        con.query(adminLogin, [value], (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data.id = value[0][0], params.data.name = value[0][1], params.data.type = value[0][2], params.data.value = value[0][3], params.data.total = value[0][4], params.data.min_price = value[0][6], params.data.start_time = value[0][7], params.data.end_time = value[0][8], params.data.create_time = value[0][10], params.data.update_time = value[0][11], params.data.order = req.body.order) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}