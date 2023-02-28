const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS system_configuration (id VARCHAR(255), open_reg INT(20), reg_method VARCHAR(255), password_min INT(255), password_encrypt VARCHAR(255), upload_method VARCHAR(255), upload_config VARCHAR(255), api_safe INT(255), api_secret VARCHAR(255), close_order_minute INT(255), auto_received_day INT(255), after_sale_day INT(255), alipay VARCHAR(255), wxpay VARCHAR(255), ship VARCHAR(255))"
con.query(sql, (err, result) => {
    if (err) throw err
    con.query("SELECT * FROM system_configuration", (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            const upload_config = JSON.stringify({
                "Bucket": "",
                "http": "",
                "ACCESS_KEY": "****************",
                "SECRET_KEY": "****************"
            })
            const alipay = JSON.stringify({
                "app_id": "****已配置****",
                "ali_public_key": "****已配置****",
                "private_key": "****已配置****"
            })
            const wxpay = JSON.stringify({
                "app_id": "****已配置****",
                "miniapp_id": "****已配置****",
                "secret": "****已配置****",
                "appid": "****已配置****",
                "mch_id": "****已配置****",
                "key": "****已配置****",
                "cert_client": "****已配置****.pem",
                "cert_key": "****已配置****.pem"
            })
            const adminLogin = "INSERT INTO system_configuration (id, open_reg, reg_method, password_min, password_encrypt, upload_method, upload_config, api_safe, api_secret, close_order_minute, auto_received_day, after_sale_day, alipay, wxpay, ship) VALUES ?"
            const value = [
                ["eeeeeeeeeee", 1, "username", 7, "0,1,2", "oss", upload_config, 1, "122232133239", 30, 7, 23, alipay, wxpay, "****已配置****"]
            ]
            con.query(adminLogin, [value], (err, result) => {
                if (err) throw err
            })
        }
    });
})