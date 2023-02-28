const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS administrator_list (id VARCHAR(255), status INT(20), create_time VARCHAR(255), update_time VARCHAR(255), username VARCHAR(255), avatar VARCHAR(255), role_id INT(255), super INT(255))"
con.query(sql, (err, result) => {
    if (err) throw err
})