const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        con.query("SELECT * FROM page_statistics_thi", (err, result, fields) => {
            if (err) throw err;
            let data = []
            result.map(item => {
                if (item.mark === req.query.type)
                    data = item
            })
            results.code === 200 ? (params.data = {}, params.data.x = JSON.parse(data.x), params.data.y = JSON.parse(data.y)) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}