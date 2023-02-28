const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS image_category_list (id VARCHAR(255), name VARCHAR(255), `order` VARCHAR(255), images_count INT(255))"
con.query(sql, (err, result) => {
    if (err) throw err
})