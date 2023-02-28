const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        if (req.body.password === req.body.oldpassword) {
            res.status(400).send({ msg: '新密码与旧密码相同', errorCode: 2000 })
        } else if (req.body.password !== req.body.repassword) {
            res.status(400).send({ msg: '新密码与确认密码不同', errorCode: 2000 })
        } else {
            const id = req.url.split(`/`)[3]
            const sql = 'UPDATE admin_login SET password = ? WHERE username = ?'
            const value = [req.body.password, 'admin']
            con.query(sql, value, (err, result, fields) => {
                if (err) throw err;
                results.code === 200 ? (params.data = {}, params.data = true) : params.errorCode = 20000
                res.status(results.code).send(params)
            })
        }
    }
}