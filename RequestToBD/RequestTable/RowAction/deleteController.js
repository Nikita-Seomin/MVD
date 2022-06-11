const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");


class reqTableController {
    deleteRow(req, res) {

            const idRequestTable = req.query.idRequestTable;          // get idRow in bd table
        const connection = mysql.createConnection(dbConfig);        // connection with bd

        async.waterfall([                                              //request to bd one by one

            //delete row on id
            function (callback) {
                let sql = "DELETE FROM RequestTable WHERE idRequestTable=?";
                connection.query(sql, [idRequestTable], (err, results) => {
                    if (err)
                        return callback(new Error('Ошибка при удалении строки'));
                    console.log(idRequestTable);
                    callback(null, results);
                });
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