const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        const sql = `SELECT * FROM product_list WHERE category_id = ?`
        con.query(sql, [req.query.category_id], (err, result, fields) => {
            if (err) throw err;
            result.map(item => {
                item.name = item.title
            })
            results.code === 200 ? (params.data = {}, params.data = result) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}