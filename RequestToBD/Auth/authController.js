const mysql = require("mysql2");
const {dbConfig, config} = require("../../Settings");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
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
                let sql = "SELECT idLogIn , password FROM MVDBD.LogIn WHERE LogIn.login= ?";
                connection.query(sql, [login], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you check login and password'));
                    else if (results.length === 0 || !bcrypt.compareSync(password, results[0]["password"]))
                        return callback(new Error("Пароль или логин не найдны"));
                    callback(null, results[0]["idLogIn"]);
                });
            },

            //generate token and update token or INSERT IF NOT EXISTS
            function (id, callback) {
                let token = generateAccessToken(id);
                let sql = "REPLACE INTO MVDBD.ActiveTokens (ActiveToken, UserID) VALUES('" + token + "', '" + id + "') ";
                connection.query(sql,(err, results) => {
                    if (err)
                        return callback(new Error('REPLACE error when you add token'));
                    res.cookie("token", token);
                    callback(null,id);
                });
            },

            //search userName on ID
            function (id, callback) {
                let sql = "SELECT UserName FROM MVDBD.Users WHERE Users.idUsers='"+ id + "'";
                connection.query(sql,(err, results) => {
                    if (err)
                        return callback(new Error('SELECT UserName error'));
                    if (results.length === 0)
                        return callback(new Error('Имя пользователя не найдено'))
                    callback(null,results[0]);
                });
            }
        ], function (err,result) {
            connection.end();
            if (err) {
                res.send('err' + err.message);
            }
            res.send(result);
        });

    }
}
module.exports = new authController();