const { verifyToken, checkUser } = require('../../api/function')
const con = require('../../data/mysqlConnect')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const formidable = require('formidable')
const moment = require('moment')
require('moment/locale/zh-cn')

module.exports = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true, uploadDir: path.join(__dirname, '../', '../', 'public', 'img'), keepExtensions: true });
    form.parse(req, async (err, fields, file) => {
        const token = await verifyToken(req.headers.token)
        const results = await checkUser(token)
        let params = {
            msg: results.msg
        }
        if (results.code === 200) {
            const data = moment().format('YYYY-MM-DD HH:mm:ss')
            const paths = ['public', 'img', file.img.newFilename].join('/')
            const adminLogin = "INSERT INTO image_list (id, name, url, path, create_time, update_time, image_class_id) VALUES ?"
            const value = [[uuidv4(), file.img.newFilename, ['http://localhost:3000', paths].join('/'), paths, data, data, fields.image_class_id]]
            con.query(adminLogin, [value], (err, result, fields) => {
                if (err) throw err;
                results.code === 200 ? (params.data = {}, params.data.id = value[0][0], params.data.name = value[0][1], params.data.url = value[0][2], params.data.path = value[0][3], params.data.create_time = value[0][4], params.data.update_time = value[0][5], params.data.image_class_id = value[0][6]) : params.errorCode = 20000
                res.status(results.code).send(params)
                let sql = 'SELECT * FROM image_category_list WHERE id = ?'
                let updata = [value[0][6]]
                con.query(sql, updata, (err, result, fields) => {
                    if (err) throw err;
                    let sql = 'UPDATE image_category_list SET images_count = ? WHERE id = ?'
                    updata = [!result[0].images_count ? 1 : result[0].images_count + 1, value[0][6]]
                    con.query(sql, updata, (err, result, fields) => {
                        if (err) throw err;
                    })
                })
            })
        }
    })
}