const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS admin_commodity (title VARCHAR(255), category_id INT(20), cover VARCHAR(255), `desc` VARCHAR(255), unit VARCHAR(255), stock INT(255), min_stock INT(255), status INT(255), stock_display INT(255), min_price INT(255), min_oprice INT(255), ischeck INT(255), create_time VARCHAR(255), update_time VARCHAR(255), id INT(255))"
con.query(sql, (err, result) => {
    if (err) throw err
})
