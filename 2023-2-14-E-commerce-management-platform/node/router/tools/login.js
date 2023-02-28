const { createToken } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = (req, res) => {
    con.query("SELECT * FROM admin_login", (err, result, fields) => {
        if (err) throw err;
        let params = {}
        let code = 400
        if (result[0].username === req.body.username && result[0].password === req.body.password) {
            let token = createToken(req.body)
            params = { msg: 'ok', data: { token } }
            code = 200
        } else if (result[0].username === req.body.username && result[0].password !== req.body.password) {
            params = { msg: '密码错误', errorCode: 20000 }
        } else if (result[0].username !== req.body.username && result[0].password === req.body.password) {
            params = { msg: '账号错误', errorCode: 20000 }
        } else {
            params = { msg: '账号密码错误', errorCode: 20000 }
        }
        res.status(code).send(params)
    });
}