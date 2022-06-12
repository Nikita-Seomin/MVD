const mysql = require("mysql2");
const {dbConfig} = require("../../Settings");

let getIDUserOnUsername = (userName) => {

    const connection = mysql.createConnection(dbConfig);
    let sql = "SELECT idUsers FROM Users WHERE UserName= ?";
    connection.query(sql, [userName], (err, results) => {
        if (err)
            return new Error('Ошибка получения ID пользователя по имени');
        else if (results.length === 0)
            return new Error("Не найден пользователь по имени");
        return results[0]['idUsers']
    });


}


module.exports = new getIDUserOnUsername();