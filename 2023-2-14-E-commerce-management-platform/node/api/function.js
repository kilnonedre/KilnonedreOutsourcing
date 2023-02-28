const jwt = require("jsonwebtoken")
const secret = '123bingjspoiuytrewqlkjhgfdsa'
const con = require('../data/mysqlConnect')
//生成token
//info也就是payload是需要存入token的信息
function createToken (info) {
    let token = jwt.sign(info, secret, {
        //Token有效时间 单位s
        expiresIn: 60 * 60 * 10
    })
    return token
}

//验证Token
function verifyToken (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

function checkUser (token) {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM admin_login", (err, result, fields) => {
            if (err) throw err;
            if (token.username === result[0].username && token.password === result[0].password) {
                resolve({ code: 200, msg: 'ok' })
            } else {
                reject({ msg: "非法token，请先登录！", code: 400 })
            }
        })
    })
}

module.exports = {
    createToken,
    verifyToken,
    checkUser
}