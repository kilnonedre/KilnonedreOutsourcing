const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')

module.exports = async (req, res) => {
    const token = await verifyToken(req.headers.token)
    const results = await checkUser(token)
    let params = {
        msg: results.msg
    }
    let status = [0, 1]
    let ischeck = [0, 1]
    if (!req.query.title) {
        req.query.title = ''
    }
    if (!req.query.category_id) {
        req.query.category_id = ''
    }
    if (req.query.tab === 'off') {
        status = [0]
    }
    if (req.query.tab === 'checking') {
        ischeck = [0]
    }
    if (req.query.tab === 'saling') {
        ischeck = [1]
        status = [1]
    }
    if (req.query.tab === 'min_stock') {
        ischeck = [1]
        status = [1]
    }
    if (results.code === 200) {
        con.query(`SELECT * FROM product_list`, (err, result, fields) => {
            if (err) throw err;
            const page = (req.url.split(`/`)[1].split('?')[0] - 1) * 10
            const administrator = result.filter(item => { return item.title.includes(req.query.title) && item.category_id.includes(req.query.category_id) && (status.indexOf(item.status) > -1) && (ischeck.indexOf(item.ischeck) > -1) && (req.query.tab === 'min_stock' ? (item.stock <= item.min_stock) : item.stock) }).slice(page, page + 10)
            con.query(`SELECT * FROM commodity_category`, (errIn, resultIn, fieldsIn) => {
                if (errIn) throw errIn;
                administrator.map(item => {
                    item.category = resultIn.find(data => data.id === item.category_id)
                })
                results.code === 200 ? (params.data = {}, params.data.list = administrator, params.data.totalCount = result.length, params.data.cates = resultIn) : params.errorCode = 20000
                res.status(results.code).send(params)
            })
        })
    }
}