const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS page_statistics_sec (label VARCHAR(255), value INT(20))"
con.query(sql, (err, result) => {
    if (err) throw err
    con.query("SELECT * FROM page_statistics_sec", (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            const adminLogin = "INSERT INTO page_statistics_sec (label, value) VALUES ?"
            const value = [
                ["审核中", 1],
                ["销售中", 9],
                ["已下架", 1],
                ["库存预警", 0],
                ["待付款", 172],
                ["待发货", 14],
                ["已发货", 0],
                ["退款中", 17]
            ]
            con.query(adminLogin, [value], (err, result) => {
                if (err) throw err
            })
        }
    });
})