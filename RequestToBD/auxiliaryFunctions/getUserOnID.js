const mysql = require("mysql2");
const {dbConfig} = require("../../Settings");

let getUserOnID = (id) => {

    const connection = mysql.createConnection(dbConfig);
    let sql = "SELECT UserName FROM Users WHERE idUsers= ?";
    connection.query(sql, [id], (err, results) => {
        if (err)
            return new Error('Ошибка получения пользователя по ID');
        else if (results.length === 0)
            return new Error("Не найден пользователь по ID");
        return results[0]['UserName']
    });


}


module.exports = getUserOnID;