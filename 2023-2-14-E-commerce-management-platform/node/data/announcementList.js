const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS announcement_list (id VARCHAR(255), title VARCHAR(255), `order` INT(255), content VARCHAR(6000), create_time VARCHAR(255), update_time VARCHAR(255))"
con.query(sql, (err, result) => {
    if (err) throw err
})