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
        const id = req.url.split(`/`)[1]
        const data = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql = 'UPDATE voucher_list SET update_time = ?, status = ? WHERE id = ?'
        const value = [data, req.body.status, id]
        con.query(sql, value, (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data = true) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}