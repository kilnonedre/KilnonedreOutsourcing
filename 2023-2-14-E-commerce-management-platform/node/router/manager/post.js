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
        con.query(`SELECT * FROM administrator_list WHERE username = ?`, [req.body.username], (err, result, fields) => {
            if (err) throw err;
            if (result.length === 0) {
                const data = moment().format('YYYY-MM-DD HH:mm:ss')
                const adminLogin = "INSERT INTO administrator_list (id, status, create_time, update_time, username, avatar, role_id, super) VALUES ?"
                const value = [[uuidv4(), req.body.status, data, data, req.body.username, req.body.avatar, req.body.role_id, 0]]
                con.query(adminLogin, [value], (err, result, fields) => {
                    if (err) throw err;
                    results.code === 200 ? (params.data = {}, params.data.id = value[0][0], params.data.status = value[0][1], params.data.create_time = value[0][2], params.data.update_time = value[0][3], params.data.username = value[0][4], params.data.avatar = value[0][5], params.data.role_id = value[0][6], params.data.super = value[0][7]) : params.errorCode = 20000
                    res.status(results.code).send(params)
                })
            } else {
                params.msg = 'username已存在'
                params.errorCode = 20000
                res.status(400).send(params)
            }
        })
    }
}