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
    if (!req.body.user_level_id) {
        req.body.user_level_id = ''
    }
    if (results.code === 200) {
        const data = moment().format('YYYY-MM-DD HH:mm:ss')
        const adminLogin = "INSERT INTO user_list (id, username, `avatar`, `nickname`, status, phone, email, user_level_id, create_time, update_time, password) VALUES ?"
        const value = [[uuidv4(), req.body.username, req.body.avatar, req.body.nickname, req.body.status, req.body.phone, req.body.email, req.body.user_level_id, data, data, req.body.password]]
        con.query(adminLogin, [value], (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data.id = value[0][0], params.data.username = value[0][1], params.data.avatar = value[0][2], params.data.nickname = value[0][3], params.data.status = value[0][4], params.data.phone = value[0][5], params.data.email = value[0][6], params.data.user_level_id = value[0][7], params.data.create_time = value[0][8], params.data.update_time = value[0][9], params.data.password = value[0][10]) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}