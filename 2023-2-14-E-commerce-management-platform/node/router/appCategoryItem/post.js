const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        const category = req.body.category_id
        const goods = req.body.goods_ids
        const sql = 'UPDATE product_list SET category_id = ? WHERE id = ?'
        goods.map(item => {
            con.query(sql, [category, item], (err, result, fields) => {
                if (err) throw err;
            })
        })
        results.code === 200 ? (params.data = {}, params.data = true) : params.errorCode = 20000
        res.status(results.code).send(params)
    }
}