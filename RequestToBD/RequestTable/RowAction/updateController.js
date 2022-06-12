const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");


class reqTableController {
    async updateRow(req, res) {
        //console.log(req.body)
        const {
            idRequestTable,
            whoSentCUSP, WhoSentCUSPDate,
            region,
            whereSent,
            couponNum,
            letterSent, letterSentDate,
            dataSentOnRegistryNum, dataSentOnRegistryDate,
            requestToNum, requestToDate,
            answerOnRequest
        } = req.body;
        const connection = mysql.createConnection(dbConfig);
        async.waterfall([

            //check CUSP
            function (callback) {
                let sql = "SELECT CUSP FROM CUSP WHERE CUSP=? LIMIT 1";
                connection.query(sql, [whoSentCUSP], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you take CUSP'));
                    else if (results.length === 0)
                        return callback(new Error("Не найден введеный КУСП "));
                    callback(null, results[0]['CUSP']);
                });
            },

            //check region
            function (CUSP, callback) {
                let sql = "SELECT idRegion FROM Region WHERE region= ? LIMIT 1";
                connection.query(sql, [region], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you take region'));
                    else if (results.length === 0)
                        return callback(new Error("Не найден введеный регион"));
                    callback(null, CUSP, results[0]['idRegion']);
                });
            },
            //check division where material sent
            function (CUSP, idRegion, callback) {
                let sql = "SELECT idDivisionWhereMaterialSent FROM DivisionWhereMaterialSent WHERE title= ? LIMIT 1";
                connection.query(sql, [whereSent], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you take division where material sent'));
                    else if (results.length === 0)
                        return callback(new Error("Не найден введенное подразделение куда направлен материал"));
                    callback(null, CUSP, idRegion, results[0]['idDivisionWhereMaterialSent']);
                });
            },

            //SELECT old row
            function (CUSP, idRegion,idDivision, callback) {
                let sql = "SELECT * FROM RequestTable WHERE idRequestTable=? LIMIT 1";
                connection.query(sql, [idRequestTable], (err, results) => {
                    if (err)
                        return callback(new Error('Ошибка при поиске строки для обновления'));
                    else if (results.length === 0)
                        return callback(new Error("Не найдена строка для обновления"));
                    callback(null, CUSP, idRegion,idDivision, results[0]);
                });
            },

            //-----------------UPDATE-REQUEST-TABLE-DATA-----------------------------------------

            function (CUSP, idRegion, idDivision, oldRow, callback) {
                let sql = "UPDATE RequestTable SET " +
                    "whoSentCUSP=?, " +
                    "whoSentCUSPDate=?, " +
                    "region=?, " +
                    "whereSent=?, " +
                    "couponNum=?, " +
                    "letterSent=?, " +
                    "letterSentDate=?, " +
                    "dataSentOnRegistryNum=?, " +
                    "dataSentOnRegistryDate=?, " +
                    "requestToNum=?, " +
                    "requestToDate=?, " +
                    "answerOnRequest=? " +
                    "WHERE idRequestTable=? LIMIT 1";

                connection.query(sql,
                    [
                        CUSP,
                        WhoSentCUSPDate,
                        idRegion,
                        idDivision,
                        couponNum,
                        letterSent, letterSentDate,
                        dataSentOnRegistryNum, dataSentOnRegistryDate,
                        requestToNum, requestToDate,
                        answerOnRequest,

                        idRequestTable,
                    ],
                    (err, results) => {
                        if (err)
                            return callback(new Error('UPDATE error when you update request table'));
                        callback(null, results);
                    });
            }

        ], function (err, result) {
            connection.end();
            if (err) {
                res.send(err.message);
            }
            res.send(result)
        });

    }
}

module.exports = new reqTableController();