const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");


class reqTableController {
    deleteRow(req, res) {

            const idRequestTable = req.query.idRequestTable;          // get idRow in bd table
        const connection = mysql.createConnection(dbConfig);        // connection with bd

        async.waterfall([                                              //request to bd one by one

            //select row on id (save results for update changes table)
            function (callback) {
                let sql = "SELECT * FROM RequestTable WHERE idRequestTable=? LIMIT 1";
                connection.query(sql, [idRequestTable], (err, results) => {
                    if (err)
                        return callback(new Error('Ошибка поиска строки перед удалением'));
                    else if (results.length === 0)
                        return callback(new Error("Не найдена данная строка"));
                    callback(null, results[0]);
                });
            },

            //delete row on id
            function (row, callback) {
                let sql = "DELETE FROM RequestTable WHERE idRequestTable=?";
                connection.query(sql, [idRequestTable], (err, results) => {
                    if (err)
                        return callback(new Error('Ошибка при удалении строки'));
                    callback(null, row);
                });
            },

            // //add changes
            // function (row, callback) {
            //     console.log(row);
            //     let change = `удалена строка: ${row.whoSentCUSP} ${row.WhoSentCUSPDate} ${row.region} ${row.whereSent} ${row.couponNum} ` +
            //         `${row.letterSent} ${row.letterSentDate} ${row.dataSentOnRegistryNum} ${row.dataSentOnRegistryDate} ` +
            //         `${row.requestToNum} ${row.requestToDate}`;
            //     console.log(row.owner);
            //     console.log(change);
            //     console.log(change.length);
            //     let sql = "INSERT INTO `changes` (`change`, `changesOwner`, `changeData`) VALUES (?, ?, ?)";
            //     connection.query(sql,
            //         [change, row.owner , new Date()],
            //         (err, results) => {
            //             if (err)
            //                 return callback(new Error('Ошибка при сохранении изменения удаления'));
            //             callback(null, results);
            //         });
            // },

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