const bd = require("../../Database");
//const app = require("./../../server");
const bodyParser = require("body-parser");
const express = require("express")
const router = express.Router();

router.get('/',(req, res) => {
    //проверить в хэше наличие куки пришедшей в req
    //если есть то значит пользователь авторизирован и отдавать ему доступ
    //если нет,то шлем запрос в data base и проверяем там логин и пароль
    //если нашли, то устанавливаем значение куки кука назваться удет token
    //получить данные и сохранить в переменные
    //п
    const sql = "SELECT * FROM MVDBD.login LIMIT 0, 1000";
    bd.query(sql,(err, results) => {
        if (err) {
            console.log("add error to LogIn");
            console.log(err);
        } else {
            res.send(results);
        }
    })
})

router.post('/LogIn/:login/:pass',(req, res) => {
    const sql = "INSERT INTO `LogIn`(`login`, `password`) VALUES('" + req.params.login + "', '" + req.params.password + "') ";
    bd.query(sql,(err, results) => {
        if (err) {
            console.log("add error to LogIn");
            console.log(err);
        } else {
            express.response.status(200);
        }
    })
})

module.exports = router;
