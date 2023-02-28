const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS page_statistics_fir (title VARCHAR(255), value FLOAT(6,2), unit VARCHAR(255), unitColor VARCHAR(255), subTitle VARCHAR(255), subValue FLOAT(6,2), subUnit VARCHAR(255))"
con.query(sql, (err, result) => {
    if (err) throw err
    con.query("SELECT * FROM page_statistics_fir", (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            const adminLogin = "INSERT INTO page_statistics_fir (title, value, unit, unitColor, subTitle, subValue, subUnit) VALUES ?"
            const value = [
                ["支付订单", 49, "年", "success", "总支付订单", 49, ""],
                ["订单量", 555, "周", "danger", "转化率", 0.6, ""],
                ["销售额", 3.54, "年", "primary", "总销售额", 3.54, ""],
                ["新增用户", 16, "年", "warning", "总用户", 16, "人"]
            ]
            con.query(adminLogin, [value], (err, result) => {
                if (err) throw err
            })
        }
    });
})