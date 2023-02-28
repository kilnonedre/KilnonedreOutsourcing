const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS skus_list (id VARCHAR(255), name VARCHAR(255), `default` VARCHAR(255), `order` INT(255), status INT(255), type INT(255), create_time VARCHAR(255), update_time VARCHAR(255))"
con.query(sql, (err, result) => {
    if (err) throw err
})