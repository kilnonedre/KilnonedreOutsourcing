const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')
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
            if (result.length === 0 || result[0].id === req.url.split(`/`)[1]) {
                const data = moment().format('YYYY-MM-DD HH:mm:ss')
                const sql = 'UPDATE administrator_list SET username = ?, role_id = ?, status = ?, avatar = ?, update_time = ? WHERE id = ?'
                const value = [req.body.username, req.body.role_id, req.body.status, req.body.avatar, data, req.url.split(`/`)[1]]
                con.query(sql, value, (err, result, fields) => {
                    if (err) throw err;
                    results.code === 200 ? (params.data = {}, params.data = true) : params.errorCode = 20000
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