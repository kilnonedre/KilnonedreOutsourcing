const con = require('./mysqlConnect')

const sql = "CREATE TABLE IF NOT EXISTS page_statistics_thi (mark VARCHAR(255), x VARCHAR(255), y VARCHAR(255))"
con.query(sql, (err, result) => {
    if (err) throw err
    con.query("SELECT * FROM page_statistics_thi", (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            const adminLogin = "INSERT INTO page_statistics_thi (mark, x, y) VALUES ?"
            const value = [
                ['hour', JSON.stringify(["00", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02", "01"]), JSON.stringify([0, 0, 0, 0, 0, 4, 6, 3, 0, 6, 3, 0, 0, 11, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0])],
                ['week', JSON.stringify(["07-24", "07-23", "07-22", "07-21", "07-20", "07-19", "07-18"]), JSON.stringify([51, 0, 1, 1, 0, 2, 1])],
                ['month', JSON.stringify(["07-24", "07-23", "07-22", "07-21", "07-20", "07-19", "07-18", "07-17", "07-16", "07-15", "07-14", "07-13", "07-12", "07-11", "07-10", "07-09", "07-08", "07-07", "07-06", "07-05", "07-04", "07-03", "07-02", "07-01", "06-30", "06-29", "06-28", "06-27", "06-26", "06-25"]), JSON.stringify([51, 0, 1, 1, 0, 2, 1, 0, 0, 0, 2, 0, 1, 0, 5, 1, 0, 0, 0, 1, 0, 0, 4, 6, 0, 0, 0, 0, 0, 0])],
            ]
            con.query(adminLogin, [value], (err, result) => {
                if (err) throw err
            })
        }
    });
})