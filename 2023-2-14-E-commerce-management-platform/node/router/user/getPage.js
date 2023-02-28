const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (!req.query.keyword) {
        req.query.keyword = ''
    }
    if (!req.query.user_level_id) {
        req.query.user_level_id = ''
    }
    if (results.code === 200) {
        con.query(`SELECT * FROM user_list`, (err, result, fields) => {
            if (err) throw err;
            const page = (req.url.split(`/`)[1].split(`?`)[0] - 1) * 10
            const administrator = result.filter(item => { return (item.username.includes(req.query.keyword) || item.phone.includes(req.query.keyword) || item.email.includes(req.query.keyword)) && item.user_level_id.includes(req.query.user_level_id) }).slice(page, page + 10)
            con.query(`SELECT * FROM membership_level`, (errIn, resultIn, fieldsIn) => {
                if (errIn) throw errIn;
                administrator.map(item => {
                    item.user_level = resultIn.find(data => data.id === item.user_level_id)
                })
                results.code === 200 ? (params.data = {}, params.data.list = administrator, params.data.totalCount = result.length, params.data.user_level = resultIn) : params.errorCode = 20000
                res.status(results.code).send(params)
            })
        })
    }
}