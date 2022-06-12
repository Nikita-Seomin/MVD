const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");
const updateData = require("./auxiliaryFunctions/updateDataInChanges");


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

            //add changes
            function (row, callback) {
                let whoSentDate = new Date(row.WhoSentCUSPDate);
                let letterSentDate = new Date(row.letterSentDate);
                let dataSentOnRegistryDate = new Date(row.dataSentOnRegistryDate);
                let requestToDate = new Date(row.requestToDate);

                let change = `удалена строка: ${row.whoSentCUSP} ` +
                    `${("0" + whoSentDate.getDate()).slice(-2)}-${("0" + (whoSentDate.getMonth() + 1)).slice(-2)}-${whoSentDate.getFullYear()} `+
                     `${row.whereSent} ${row.couponNum} ${row.letterSent} ` +
                    `${("0" + letterSentDate.getDate()).slice(-2)}-${("0" + (letterSentDate.getMonth() + 1)).slice(-2)}-${letterSentDate.getFullYear()} ` +
                    `${row.dataSentOnRegistryNum} ` +
                    `${("0" + dataSentOnRegistryDate.getDate()).slice(-2)}-${("0" + (dataSentOnRegistryDate.getMonth() + 1)).slice(-2)}-${dataSentOnRegistryDate.getFullYear()} ` +
                    `${row.requestToNum} ` +
                    `${("0" + requestToDate.getDate()).slice(-2)}-${("0" + (requestToDate.getMonth() + 1)).slice(-2)}-${requestToDate.getFullYear()} `;

                let sql = "INSERT INTO `changes` (`change`, `changesOwner`, `changeData`) VALUES (?, ?, ?)";
                connection.query(sql,
                    [change, row.owner , new Date()],
                    (err, results) => {
                        if (err)
                            return callback(new Error('Ошибка при сохранении изменения удаления'));
                        callback(null, row.owner, results);
                    });
            },

            function (owner, results, callback) {
                updateData(owner);
                callback(null,results);
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