const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        const sql = `SELECT * FROM image_list WHERE url IN ?`
        const value = [req.body.banners]
        let data = []
        con.query(sql, [value], (err, result, fields) => {
            if (err) throw err;
            result.map(item => {
                data.push(item.id)
            })
            data = JSON.stringify(data)
            const values = [data, req.url.split(`/`)[2]]
            const up = `UPDATE product_list SET goods_Banner = ? WHERE id = ?`
            con.query(up, values, (err, result, fields) => {
                if (err) throw err;
            })
            results.code === 200 ? (params.data = {}, params.data = result) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}