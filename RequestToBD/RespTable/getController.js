const mysql = require("mysql2");
const {dbConfig} = require("../../Settings");
const async = require("async");


class respTableController {
    getRows(req, res) {

        const userName = req.query.userName;
        const connection = mysql.createConnection(dbConfig);

        async.waterfall([

            //take user ID
            function (callback) {
                let sql = "SELECT idUsers FROM Users WHERE UserName=? LIMIT 1";
                connection.query(sql, [userName], (err, results) => {
                    console.log(results)
                    if (err)
                        return callback(new Error('SELECT error when you take user ID'));
                    else if (results.length === 0)
                        return callback(new Error("Не найден id у этого пользователя"));
                    callback(null, results[0]["idUsers"]);
                });
            },

            //SELECT rows in request table
            function (idUser, callback) {
                let sql = "SELECT * FROM RequestTable WHERE whereSent=? AND ResponseTable IS NULL ";
                connection.query(sql, [idUser], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you take rows in request table'));
                    console.log(results)
                    callback(null, results);
                });
            },


            function (rows, callback) {

                for (let i = 0; i < rows.length; ++i) {
                    async.waterfall([

                            //SELECT and change region
                            function (callback) {
                                let sql = "SELECT region FROM Region WHERE idRegion=? LIMIT 1";
                                connection.query(sql, [rows[i]['region']], (err, results) => {
                                    if (err)
                                        return callback(new Error('SELECT error when you take region and change it'));
                                    rows[i].region = results[0]['region'];
                                    callback(null)
                                });
                            },

                            // //SELECT and change division where material sent
                            function (callback) {

                                let sql = "SELECT UserName FROM Users WHERE idUsers=? LIMIT 1";
                                connection.query(sql, [rows[i]['owner']], (err, results) => {
                                    if (err)
                                        return callback(new Error('SELECT error when you take region and change it'));
                                    if (results.length===0){
                                        return callback(new Error('В базе данных не найдено подразделение, в который направлен материал проверки '));
                                    }
                                    rows[i].owner = results[0]['UserName'];
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




module.exports = new respTableController();