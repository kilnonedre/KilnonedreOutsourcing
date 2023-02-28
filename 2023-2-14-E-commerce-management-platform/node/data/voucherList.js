const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS voucher_list (id VARCHAR(255), name VARCHAR(255), type INT(255), value VARCHAR(255), total INT(255), used INT(255), min_price VARCHAR(255), start_time VARCHAR(255), end_time VARCHAR(255), status INT(255), create_time VARCHAR(255), update_time VARCHAR(255), `order` INT(255), `desc` VARCHAR(5000))"
con.query(sql, (err, result) => {
    if (err) throw err
})