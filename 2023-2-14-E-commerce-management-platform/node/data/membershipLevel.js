const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS membership_level (id VARCHAR(255), name VARCHAR(255), `level` INT(255), `status` INT(255), discount INT(255), max_price INT(255), max_times INT(255))"
con.query(sql, (err, result) => {
    if (err) throw err
})
