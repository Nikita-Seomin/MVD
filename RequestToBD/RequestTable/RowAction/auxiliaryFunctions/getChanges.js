const mysql = require("mysql2");
const {dbConfig} = require("../../../../Settings");
const async = require("async");

class changes {
    getChanges (req, res) {
        const userName = req.query.userName;
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
            },
            function (ID, callback) {
                let sql = "SELECT `change`,`changeData` FROM changes WHERE changesOwner= ?";
                connection.query(sql, [ID], (err, results) => {
                    if (err)
                        return callback(new Error('Ошибка получения изменений'));
                    callback(null, results);
                });
            },

        ], function (err, results) {
            if (err) {
                res.send(err.message)
            }
            res.send(results)
        })




    }
}



module.exports = new changes();