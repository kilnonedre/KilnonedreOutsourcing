const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        con.query("SELECT * FROM page_statistics_fir", (err, result, fields) => {
            if (err) throw err;
            result.map(item => {
                if (item.subTitle === '转化率') {
                    item.subValue = item.subValue * 100 + '%'
                }
            })
            results.code === 200 ? (params.data = {}, params.data.panels = result) : params.errorCode = 20000
            res.status(results.code).send(params)
        })
    }
}