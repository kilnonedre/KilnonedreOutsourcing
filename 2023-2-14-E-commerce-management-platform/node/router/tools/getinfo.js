const { verifyToken, checkUser } = require('../../api/function')
const data = require('../../data.json')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const result = await checkUser(token)
    let params = {
        msg: result.msg
    }
    result.code === 200 ? params.data = data : params.errorCode = 20000
    res.status(result.code).send(params)
}