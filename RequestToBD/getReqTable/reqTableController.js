const mysql = require("mysql2");
const {dbConfig, config} = require("../../Settings");
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const async = require("async");

// const generateAccessToken = (id) => {
//     const payload = {
//         id
//     }
//     return jwt.sign(payload, config.secret, {expiresIn: "3h"});
// }

class reqTableController {
    async login(req, res) {
        const {userName} = req.body;
        const connection = mysql.createConnection(dbConfig);

        async.waterfall([

            //take user ID
            function (callback) {
                let sql = "SELECT idUsers FROM Users WHERE UserName= ?";
                connection.query(sql, [userName], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you take user ID'));
                    else if (results.length === 0 )
                        return callback(new Error("Не найден id у этого пользователя"));
                    callback(null, results[0]["idUsers"]);
                });
            },


            //search id request path
            function (id, callback) {
                let sql = "SELECT requestPath FROM tableInfo WHERE dataOwner='"+ id + "' ";
                connection.query(sql,(err, results) => {
                    if (err)
                        return callback(new Error('ELECT error when you search id request path'));
                    else if (results.length === 0 )
                        return callback(new Error("Не найдена таблица запросов у этого пользователя"));
                    callback(null,results);
                });
            },

            //search userName on ID
            // function (id, callback) {
            //     let sql = "SELECT UserName FROM MVDBD.Users WHERE Users.idUsers='"+ id + "'";
            //     connection.query(sql,(err, results) => {
            //         if (err)
            //             return callback(new Error('SELECT UserName error'));
            //         if (results.length === 0)
            //             return callback(new Error('Имя пользователя не найдено'))
            //         callback(null,results[0]);
            //     });
            // }
        ], function (err,result) {
            connection.end();
            if (err) {
                res.send(err.message);
            }
            res.send(result);
        });

    }
}
module.exports = new reqTableController();