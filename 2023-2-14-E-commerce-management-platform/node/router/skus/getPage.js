const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        con.query(`SELECT * FROM skus_list`, (err, result, fields) => {
            if (err) throw err;
            const page = (req.url.split(`/`)[1] - 1) * 10
            const administrator = result.slice(page, page + 10)
            results.code === 200 ? (params.data = {}, params.data.list = administrator, params.data.totalCount = result.length) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}