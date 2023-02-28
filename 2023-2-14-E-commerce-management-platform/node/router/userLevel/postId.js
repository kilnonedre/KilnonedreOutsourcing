const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        const value = req.url.split('/')[1]
        const sql = 'UPDATE membership_level SET name = ?, `level` = ?, `status` = ?, discount = ?, max_price = ?, max_times = ? WHERE id = ?'
        con.query(sql, [req.body.name, req.body.level, req.body.status, req.body.discount, req.body.max_price, req.body.max_times, value], (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data = true) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}