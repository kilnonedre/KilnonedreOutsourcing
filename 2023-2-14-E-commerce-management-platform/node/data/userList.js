const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS user_list (id VARCHAR(255), password VARCHAR(255), username VARCHAR(255), `avatar` VARCHAR(255), `nickname` VARCHAR(255), status INT(255), phone VARCHAR(255), email VARCHAR(255), user_level_id VARCHAR(255) DEFAULT '', last_login_time VARCHAR(255), create_time VARCHAR(255), update_time VARCHAR(255))"
con.query(sql, (err, result) => {
    if (err) throw err
})