const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        const categoryId = req.url.split(`/`)[1]
        const page = req.url.split(`/`)[3] - 1
        const sql = 'SELECT * FROM image_list WHERE image_class_id = ?'
        con.query(sql, [categoryId], (err, result, fields) => {
            if (err) throw err;
            const administrator = result.slice(page, page + 10)
            results.code === 200 ? (params.data = {}, params.data.list = administrator, params.data.totalCount = result.length) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}