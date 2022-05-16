const mysql = require("mysql2");
const {dbConfig} = require("../../Settings");
const jwt = require("jsonwebtoken");
const {config} = require("./../../Settings")

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, config.secret, {expiresIn: "1h"});
}

class authController {
    async login(req, res) {
        try {
            const {login, password} = req.body;
            //res.send(req.body);


            //check Login and password
                const connection = await mysql.createConnection(dbConfig);
                let sql = "SELECT idLogIn FROM MVDBD.LogIn WHERE LogIn.login= ? AND LogIn.password= ? ";
                connection.query(sql,[login,password],(err, results) => {
                    if (err) {
                        console.log("SELECT error to LogIn");
                        console.log(err);
                        connection.end();
                        return 1;
                    }
                    else if (results.length === 0) {
                        res.send("Пароль или логин не найдны");
                        connection.end();
                    }
                    else {








                        let id = results[0]["idLogIn"];
                        let sql2 = "SELECT UserName FROM MVDBD.Users WHERE Users.idUsers='" + id + "' ";
                        connection.query(sql2,(err, results2) => {
                            if (err) {
                                console.log("SELECT error to Users");
                                console.log(err);
                                connection.end();
                                return 2;
                            }
                            else {










                                let token = generateAccessToken(id);
                                let sql3 = "INSERT INTO MVDBD.ActiveTokens"
                                connection.query(sql,[login,password],(err, results) => {
                                    if (err) {
                                        console.log("SELECT error to LogIn");
                                        console.log(err);
                                        connection.end();
                                        return 1;
                                    }
                                    else if (results.length === 0) {
                                        res.send("Пароль или логин не найдны");
                                        connection.end();
                                    }
                                    else {

                                    }
                                });
                                //TODO созранит токен в бд и если ве зае.ись то вернуть в куки [
                                // структура бд будет пользователь : токен
                                res.cookies("token",token)
                                res.send(results2);
                            }
                        });
                    }
                });

        } catch (e) {
            console.log("authController : login Error");
            console.log(e);
        }
    }
}

module.exports = new authController();