const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");


class respTablePageController {
    saveAnswer(req, res) {

        const {
            idRequestTable,
            respLetterNum, respLetterDate,
            respDateSentOnRegistyNum,
            respDateSentOnRegistyDate,
            whoTakeCUSP,
            whoTakeDate,
            decisionNum,
            decisionDate
        } = req.body

        const connection = mysql.createConnection(dbConfig);

        async.waterfall([

            //insert data in resp table
            function (callback) {
                let sql = "INSERT INTO ResponseTable " +
                    "(" +
                    "respLetterNum, respLetterDate, respDateSentOnRegistyNum," +
                    "respDateSentOnRegistyDate, whoTakeCUSP, whoTakeDate," +
                    "decisionNum, decisionDate" +
                    ") VALUES (?,?,?,?,?,?,?,?)";
                connection.query(sql,
                    [respLetterNum,respLetterDate,respDateSentOnRegistyNum,
                        respDateSentOnRegistyDate,whoTakeCUSP,whoTakeDate,
                        decisionNum,decisionDate],
                    (err) => {
                        if (err)
                            return callback(new Error('Ошибка при добавлении строки ответа в соответствующую таблицу'));
                        callback(null);
                    });
            },

            //insert data in resp table
            function (callback) {
                let sql = "SELECT idResponseTable FROM ResponseTable WHERE " +
                    "respLetterNum=? AND respLetterDate=? AND " +
                    "respDateSentOnRegistyNum=? AND " +
                    "respDateSentOnRegistyDate=? AND " +
                    "whoTakeCUSP=? AND whoTakeDate=? AND " +
                    "decisionNum=? AND decisionDate=?" +
                    "ORDER BY idResponseTable DESC LIMIT 1";
                connection.query(sql,
                    [respLetterNum,respLetterDate,respDateSentOnRegistyNum,
                        respDateSentOnRegistyDate,whoTakeCUSP,whoTakeDate,
                        decisionNum,decisionDate],
                    (err, results) => {
                        if (err) {
                            console.log(err.message);
                            return callback(new Error('Ошибка при поиске id добавленной в таблицу ответов строки ответа на запрос'));}
                        callback(null, results[0]['idResponseTable']);
                    });
            },
            //insert data in resp table
            function (idResTable, callback) {
                let sql = "UPDATE RequestTable SET ResponseTable = ? WHERE idRequestTable=?";
                connection.query(sql,
                    [idResTable,idRequestTable],
                    (err, ) => {
                        if (err)
                            return callback(new Error('Ошибка при добавлении в таблицу запросов строки ответа на запрос'));
                        callback(null);
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
module.exports = new respTablePageController();