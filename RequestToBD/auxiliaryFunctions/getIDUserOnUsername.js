const mysql = require("mysql2");
const {dbConfig} = require("../../Settings");
const async = require("async");


const getIDUserOnUsername = (userName) => {
    const connection = mysql.createConnection(dbConfig);
    async.waterfall([

        function (callback) {
            let sql = "SELECT idUsers FROM Users WHERE UserName= ? LIMIT 1";
            connection.query(sql, [userName], (err, results) => {
                if (err)
                    return new Error('Ошибка получения ID пользователя по имени');
                else if (results.length === 0)
                    return callback(new Error("Не найден пользователь по имени"));
                callback(null, results[0]['idUsers']);
            });
    }

    ], function (err, results) {
        connection.end();
        if (err) {
            return (err.message);
        }
        return results;
    })
}


module.exports =  getIDUserOnUsername;