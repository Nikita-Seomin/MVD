const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");


class reqTableController {
    async getRegions(req, res) {

        const connection = mysql.createConnection(dbConfig);

        async.waterfall([

            //take user ID
            function (callback) {
                let sql = "SELECT region FROM Region";
                connection.query(sql,  (err, results) => {
                    if (err)
                        return callback(new Error('Ошибка при поиске регионов'));
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
module.exports = new reqTableController();