const mysql = require("mysql2");
const {dbConfig} = require("../../Settings");
const jwt = require("jsonwebtoken");
const {config} = require("./../../Settings")
const async = require("async");

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, config.secret, {expiresIn: "1h"});
}

class authController {
    async login(req, res) {
        const {login, password} = req.body;
        const connection = mysql.createConnection(dbConfig);

        async.waterfall([

            //check Login and password
            function (callback) {
                let sql = "SELECT idLogIn FROM MVDBD.LogIn WHERE LogIn.login= ? AND LogIn.password= ? ";
                connection.query(sql, [login, password], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you check login and password'));
                    else if (results.length === 0)
                        return callback(new Error("Пароль или логин не найдны"));
                    callback(null, results[0]["idLogIn"]);
                });
            },

            //generate token and delete token if exists
            function (id, callback) {
                let token = generateAccessToken(id);
                let sql = "INSERT INTO MVDBD.ActiveTokens (UserID) VALUES('" + id + "') ";
                console.log(sql);
                connection.query(sql,[login,password],(err, results) => {
                    if (err)
                        return callback(new Error('INSERT error when you search id in ActiveTokens Table and INSERT IF EXISTS'));
                    callback(null, results);
                });
                //TODO созранит токен в бд и если ве зае.ись то вернуть в куки [
                // структура бд будет пользователь : токен
            }
        ], function (err, result) {
            connection.end();
            if (err) {
                res.send(err.message);
            }
            res.send(result);
        });

    }
}

module.exports = new authController();