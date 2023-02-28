const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS image_list (id VARCHAR(255), name VARCHAR(255), url VARCHAR(255), path VARCHAR(255), create_time VARCHAR(255), update_time VARCHAR(255), image_class_id VARCHAR(255))"
con.query(sql, (err, result) => {
    if (err) throw err
})