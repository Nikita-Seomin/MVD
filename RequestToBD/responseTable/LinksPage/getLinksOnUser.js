const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");


class linksPageController {
    async getLinksOnPage(req, res) {

        const userName = req.query.userName

        const connection = mysql.createConnection(dbConfig);

        async.waterfall([

            //take user ID
            function (callback) {
                let sql = "SELECT idUsers FROM Users WHERE UserName=? LIMIT 1";
                connection.query(sql,
                    [userName],
                    (err, results) => {
                    if (err)
                        return callback(new Error('Ошибка при поиске ID пользователя'));
                    else if (results.length === 0)
                            return callback(new Error('Пользователь не найден'));
                    callback(null, results[0]['idUsers']);
                }); 
            },

            //take rows where user is owner and resp Table is empty
            function (userId, callback) {
                let sql = "SELECT * FROM RequestTable WHERE whereSent=? AND ResponseTable IS NULL";
                connection.query(sql,
                    [userId],
                    (err, results) => {
                        if (err)
                            return callback(new Error('Ошибка при поиске строк запросов для таблицы ответов'));
                        callback(null, results);
                    });
            },



        ], function (err,result) {
            connection.end();
            if (err) {
                res.send(err.message);
            }
            res.send(result);
        });

    }
}
module.exports = new linksPageController();