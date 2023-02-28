const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        const sql = 'SELECT * FROM system_configuration'
        con.query(sql, (err, result, fields) => {
            if (err) throw err;
            result[0].upload_config = JSON.parse(result[0].upload_config)
            result[0].alipay = JSON.parse(result[0].alipay)
            result[0].wxpay = JSON.parse(result[0].wxpay)
            results.code === 200 ? (params.data = {}, params.data = result[0]) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}