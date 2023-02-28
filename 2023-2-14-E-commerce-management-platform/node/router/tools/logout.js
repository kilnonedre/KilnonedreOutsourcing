const { verifyToken, checkUser } = require('../../api/function')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    if (results.code === 200) {
        params.data = '退出登录成功'
    } else {
        params.msg = '非法token，请先登录！'
        params.errorCode = 20000
    }
    res.status(results.code).send(params)
}