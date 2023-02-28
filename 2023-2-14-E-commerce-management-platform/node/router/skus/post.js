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
        const adminLogin = "INSERT INTO skus_list (id, name, status, `default`, create_time, update_time, `order`, type) VALUES ?"
        const value = [[uuidv4(), req.body.name, req.body.status, req.body.default, data, data, req.body.order, 0]]
        con.query(adminLogin, [value], (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data.id = value[0][0], params.data.name = value[0][1], params.data.status = value[0][2], params.data.default = value[0][3], params.data.create_time = value[0][4], params.data.update_time = value[0][5], params.data.order = value[0][6]) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}