const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        con.query(`SELECT * FROM commodity_category`, (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data = result) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}