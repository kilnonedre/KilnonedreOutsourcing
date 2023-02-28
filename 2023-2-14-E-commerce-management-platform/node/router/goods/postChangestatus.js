const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        const sql = 'UPDATE product_list SET status = ? WHERE id = ?'
        req.body.ids.map(item => {
            con.query(sql, [req.body.status, item], (err, result, fields) => {
                if (err) throw err;
            })
        })
        results.code === 200 ? (params.data = {}, params.data = true) : params.errorCode = 20000
        res.status(results.code).send(params)
    }
}