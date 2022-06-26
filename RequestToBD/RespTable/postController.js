const mysql = require("mysql2");
const {dbConfig} = require("../../Settings");
const async = require("async");


class reqTableController {
    async addRow(req, res) {
        const {
            idRequestTable,
            respLetterNum,
            respLetterDate,
            respDateSentOnRegistyNum,
            respDateSentOnRegistyDate,
            whoTakeCUSP,
            whoTakeDate,
            decisionNum,
            decisionDate
        } = req.body;
        const connection = mysql.createConnection(dbConfig);

        async.waterfall([

            //add answer on request
            function (callback) {

                let sql = "INSERT INTO `ResponseTable` " +
                    "(" +
                    "`respLetterNum`, `respLetterDate`, " +
                    "`respDateSentOnRegistyNum`, `respDateSentOnRegistyDate`, " +
                    "`whoTakeCUSP`, `whoTakeDate`, " +
                    "`decisionNum`, `decisionDate`" +
                    ")" +
                    "VALUES (?, ?, ? ,?, ?, ?, ?, ?)";
                connection.query(sql,
                    [
                        respLetterNum, respLetterDate,
                        respDateSentOnRegistyNum, respDateSentOnRegistyDate,
                        whoTakeCUSP, whoTakeDate,
                        decisionNum, decisionDate,
                    ],
                    (err) => {
                        if (err)
                            return callback(new Error('INSERT to Request Table error'));
                        callback(null);
                    });
            },

            function (callback) {
                let sql = "UPDATE RequestTable SET ResponseTable= ( " +
                    "SELECT idResponseTable FROM ResponseTable WHERE " +
                    "respLetterNum=? AND respLetterDate=? AND " +
                    "respDateSentOnRegistyNum=? AND respDateSentOnRegistyDate=? AND " +
                    "whoTakeCUSP=? AND whoTakeDate=? AND " +
                    "decisionNum=? AND decisionDate=? ORDER BY idResponseTable DESC LIMIT 1) WHERE idRequestTable=?"
                connection.query(sql,
                    [
                        respLetterNum, respLetterDate,
                        respDateSentOnRegistyNum, respDateSentOnRegistyDate,
                        whoTakeCUSP, whoTakeDate,
                        decisionNum, decisionDate,
                        idRequestTable
                    ],
                    (err, results) => {
                        if (err)
                            return callback(new Error(''));
                        callback(null, results);
                    });
            },

        ], function (err,result) {
            if (err) {
                res.send(err.message);
            }
            res.send(result);
        });

    }
}
module.exports = new reqTableController();