const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");


class reqTableController {
    getRows(req, res) {

        const userName = req.query.userName;
        const connection = mysql.createConnection(dbConfig);

        async.waterfall([

            //take user ID
            function (callback) {
                let sql = "SELECT idUsers FROM Users WHERE UserName= ?";
                connection.query(sql, [userName], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you take user ID'));
                    else if (results.length === 0)
                        return callback(new Error("Не найден id у этого пользователя"));
                    callback(null, results[0]["idUsers"]);
                });
            },

            //SELECT rows in request table
            function (idUser, callback) {
                let sql = "SELECT * FROM RequestTable WHERE owner=?";
                connection.query(sql, [idUser], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you take rows in request table'));
                    callback(null, results);
                });
            },


            function (rows, callback) {

                for (let i = 0; i < rows.length; ++i) {
                    async.waterfall([

                            //SELECT and change region
                            function (callback) {
                                let sql = "SELECT region FROM Region WHERE idRegion=?";
                                connection.query(sql, [rows[i]['region']], (err, results) => {
                                    if (err)
                                        return callback(new Error('SELECT error when you take region and change it'));
                                    rows[i].region = results[0]['region'];
                                    callback(null)
                                });
                            },

                            // //SELECT and change region
                            function (callback) {

                                let sql = "SELECT title FROM DivisionWhereMaterialSent WHERE idDivisionWhereMaterialSent=?";
                                connection.query(sql, [rows[i]['whereSent']], (err, results) => {
                                    if (err)
                                        return callback(new Error('SELECT error when you take region and change it'));
                                    if (results.length===0){
                                        return callback(new Error('В базе данных не найдено подразделение, в который направлен материал проверки '));
                                    }
                                    rows[i].whereSent = results[0]['title'];
                                    callback(null, rows)
                                });
                            }
                        ],
                        function (err, result) {
                            if (err) {
                                callback(new Error(err));
                            }
                            if (rows.length===(i+1)){
                                callback(null, result);
                            }
                        });
                }
                if (rows.length===0){
                    callback(null, rows);
                }
            },


        ], function (err, result) {
            connection.end();
            if (err) {
                res.send(err.message);
            }
            res.send(result);
        });

    }
}




module.exports = new reqTableController();