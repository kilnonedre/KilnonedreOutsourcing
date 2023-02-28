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
        const adminLogin = "INSERT INTO image_category_list (id, name, `order`) VALUES ?"
        const value = [[uuidv4(), req.body.name, req.body.order]]
        con.query(adminLogin, [value], (err, result, fields) => {
            if (err) throw err;
            results.code === 200 ? (params.data = {}, params.data.name = req.body.name, params.data.order = req.body.order, params.data.id = value[0][0]) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}