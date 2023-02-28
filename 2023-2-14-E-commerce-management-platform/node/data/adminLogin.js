const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS admin_login (username VARCHAR(255), password VARCHAR(255))"
con.query(sql, (err, result) => {
    if (err) throw err
    con.query("SELECT * FROM admin_login", (err, result) => {
        if (err) throw err;
        if (result.length === 0 || result[0].username !== 'admin') {
            const adminLogin = "INSERT INTO admin_login (username, password) VALUES ('admin', 'admin')"
            con.query(adminLogin, (err, result) => {
                if (err) throw err
            })
        }
    });

})