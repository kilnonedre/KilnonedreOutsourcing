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
    let sql = ''
    let value = []
    const id = req.url.split(`/`)[1]
    const data = moment().format('YYYY-MM-DD HH:mm:ss')
    if (req.body.content) {
        sql = 'UPDATE product_list SET content = ? WHERE id = ?'
        value = [req.body.content, id]
    } else {
        sql = 'UPDATE product_list SET title = ?, category_id = ?, cover = ?, `desc` = ?, unit = ?, stock = ?, min_stock = ?, status = ?, stock_display = ?, min_price = ?, min_oprice = ?, update_time = ? WHERE id = ?'
        value = [req.body.title, req.body.category_id, req.body.cover, req.body.desc, req.body.unit, req.body.stock, req.body.min_stock, req.body.status, req.body.stock_display, req.body.min_price, req.body.min_oprice, data, id]
    }
    if (results.code === 200) {
        con.query(sql, value, (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data = true) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}