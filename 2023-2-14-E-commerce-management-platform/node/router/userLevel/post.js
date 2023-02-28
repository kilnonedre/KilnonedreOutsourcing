const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')
const { v4: uuidv4 } = require('uuid')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        const adminLogin = "INSERT INTO membership_level (id, name, `level`, `status`, discount, max_price, max_times) VALUES ?"
        const value = [[uuidv4(), req.body.name, req.body.level, req.body.status, req.body.discount, req.body.max_price, req.body.max_times]]
        con.query(adminLogin, [value], (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data.id = value[0][0], params.data.name = value[0][1], params.data.level = value[0][2], params.data.status = value[0][3], params.data.discount = value[0][4], params.data.max_price = value[0][5], params.data.max_times = value[0][6]) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}