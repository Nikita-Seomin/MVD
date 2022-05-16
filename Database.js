const mysql = require("mysql2");
const {dbConfig} = require("./Settings");

const connection = mysql.createConnection(dbConfig);

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});
connection.end();

module.exports = connection;


