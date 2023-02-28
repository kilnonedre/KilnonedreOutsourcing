const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    let sql = ''
    let value = []
    if (req.body.open_reg !== undefined) {
        sql = 'UPDATE system_configuration SET open_reg = ?, reg_method  = ?, password_min  = ?, password_encrypt  = ?, upload_method  = ?, upload_config  = ?, api_safe  = ?, api_secret  = ? WHERE id = ?'
        value = [req.body.open_reg, req.body.reg_method, req.body.password_min, req.body.password_encrypt, req.body.upload_method, JSON.stringify(req.body.upload_config), req.body.api_safe, req.body.api_secret, 'eeeeeeeeeee']
    } else if (req.body.close_order_minute !== undefined) {
        sql = 'UPDATE system_configuration SET close_order_minute  = ?, auto_received_day  = ?, after_sale_day  = ?, alipay  = ?, wxpay  = ? WHERE id = ?'
        value = [req.body.close_order_minute, req.body.auto_received_day, req.body.after_sale_day, JSON.stringify(req.body.alipay), JSON.stringify(req.body.wxpay), 'eeeeeeeeeee']
    }
    if (results.code === 200) {
        con.query(sql, value, (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data = true) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}