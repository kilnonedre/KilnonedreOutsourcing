const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS administrator_role (id INT(20), name VARCHAR(255))"
con.query(sql, (err, result) => {
    if (err) throw err
    con.query("SELECT * FROM administrator_role", (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            const adminLogin = "INSERT INTO administrator_role (id, name) VALUES ?"
            const value = [
                [2, "超级管理员"],
                [3, "运营"],
                [9, "测试"],
                [19, "销售"],
                [21, "技术"],
                [31, "测试的故事"],
                [35, "普通管理员"],
                [36, "后勤"],
                [38, "新角色"],
            ]
            con.query(adminLogin, [value], (err, result) => {
                if (err) throw err
            })
        }
    });
})