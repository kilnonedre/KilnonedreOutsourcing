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
    if (!req.query.user_level_id) {
        req.query.user_level_id = ''
    }
    if (results.code === 200) {
        const data = moment().format('YYYY-MM-DD HH:mm:ss')
        const value = req.url.split('/')[1]
        const sql = 'UPDATE user_list SET username = ?, `avatar` = ?, `nickname` = ?, status = ?, phone = ?, email = ?, user_level_id = ?, update_time = ?, password = ? WHERE id = ?'
        con.query(sql, [req.body.username, req.body.avatar, req.body.nickname, req.body.status, req.body.phone, req.body.email, req.body.user_level_id, data, req.body.password, value], (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data = true) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}