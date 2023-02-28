const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    const zero = JSON.stringify({
        oprice: 0,
        pprice: 0,
        cprice: 0,
        weight: 0,
        volume: 0
    })
    if (results.code === 200) {
        const sql = 'SELECT * FROM product_list WHERE id = ?'
        let value = [req.url.split(`/`)[2]]
        con.query(sql, [value], (err, result, fields) => {
            if (err) throw err;
            const data = JSON.parse((result[0].goods_banner === '' ? '[""]' : result[0].goods_banner))
            const sqlIn = `SELECT * FROM image_list WHERE id IN ?`
            con.query(sqlIn, [[data]], (errIn, resultIn, fieldsIn) => {
                result[0].goodsBanner = resultIn
                result[0].sku_value = JSON.parse((result[0].sku_value === '' ? zero : result[0].sku_value))
                result[0].goodsAttrs = []
                result[0].goodsSkus = []
                result[0].goodsSkusCard = []
                results.code === 200 ? (params.data = {}, params.data = result[0]) : params.errorCode = 20000
                res.status(results.code).send(params)
            })
        })
    }
}