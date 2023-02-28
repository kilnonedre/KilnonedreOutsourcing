const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS product_list (id VARCHAR(255), title VARCHAR(255) DEFAULT '', category_id VARCHAR(255) DEFAULT '', cover VARCHAR(255), rating INT(255) DEFAULT 0, sale_count INT(255) DEFAULT 0, review_count INT(255) DEFAULT 0, min_price INT(255), min_oprice INT(255), `desc` VARCHAR(255), unit VARCHAR(255), stock INT(255), min_stock INT(255), ischeck INT(255), status INT(255), stock_display INT(255), express_id VARCHAR(255) DEFAULT '', sku_type INT(255) DEFAULT 0, sku_value VARCHAR(255) DEFAULT '', content VARCHAR(5000) DEFAULT '', discount INT(255) DEFAULT 0,  create_time VARCHAR(255), update_time VARCHAR(255), delete_time VARCHAR(255) DEFAULT '', `order` INT(255) DEFAULT 0, category VARCHAR(255) DEFAULT '', goods_banner VARCHAR(255) DEFAULT '', goods_attrs VARCHAR(255) DEFAULT '', goods_skus VARCHAR(255) DEFAULT '', goods_skus_cardv VARCHAR(255) DEFAULT '')"
con.query(sql, (err, result) => {
    if (err) throw err
})