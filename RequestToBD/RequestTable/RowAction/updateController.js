const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");
const updateData = require("./auxiliaryFunctions/updateDataInChanges");


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
                        callback(null, oldRow, results);
                    });
            },

            //SELECT new row
            function (oldRow,result, callback) {
                let sql = "SELECT * FROM RequestTable WHERE idRequestTable=? LIMIT 1";
                connection.query(sql, [idRequestTable], (err, results) => {
                    if (err)
                        return callback(new Error('Ошибка при поиске обновленной строки для обновления'));
                    else if (results.length === 0)
                        return callback(new Error("Не найдена строка для обновления"));
                    callback(null, oldRow, results[0], result);
                });
            },

            //add changes
            function (oldRow, newRow, result, callback) {

                let whoSentDateOldRow = new Date(oldRow.WhoSentCUSPDate);
                let whoSentDateOldRowStr = `${("0" + whoSentDateOldRow.getDate()).slice(-2)}-${("0" + (whoSentDateOldRow.getMonth() + 1)).slice(-2)}-${whoSentDateOldRow.getFullYear()} `
                let letterSentDateOldRow = new Date(oldRow.letterSentDate);
                let letterSentDateOldRowStr = `${("0" + letterSentDateOldRow.getDate()).slice(-2)}-${("0" + (letterSentDateOldRow.getMonth() + 1)).slice(-2)}-${letterSentDateOldRow.getFullYear()} `
                let dataSentOnRegistryDateOldRow = new Date(oldRow.dataSentOnRegistryDate);
                let dataSentOnRegistryDateOldRowStr = `${("0" + dataSentOnRegistryDateOldRow.getDate()).slice(-2)}-${("0" + (dataSentOnRegistryDateOldRow.getMonth() + 1)).slice(-2)}-${dataSentOnRegistryDateOldRow.getFullYear()} `
                let requestToDateOldRow = new Date(oldRow.requestToDate);
                let requestToDateOldRowStr = `${("0" + requestToDateOldRow.getDate()).slice(-2)}-${("0" + (requestToDateOldRow.getMonth() + 1)).slice(-2)}-${requestToDateOldRow.getFullYear()} `

                let whoSentDateNewRow = new Date(newRow.WhoSentCUSPDate);
                let whoSentDateNewRowStr = `${("0" + whoSentDateNewRow.getDate()).slice(-2)}-${("0" + (whoSentDateNewRow.getMonth() + 1)).slice(-2)}-${whoSentDateNewRow.getFullYear()} `
                let letterSentDateNewRow = new Date(newRow.letterSentDate);
                let letterSentDateNewRowStr = `${("0" + letterSentDateNewRow.getDate()).slice(-2)}-${("0" + (letterSentDateNewRow.getMonth() + 1)).slice(-2)}-${letterSentDateNewRow.getFullYear()} `
                let dataSentOnRegistryDateNewRow = new Date(newRow.dataSentOnRegistryDate);
                let dataSentOnRegistryDateNewRowStr = `${("0" + dataSentOnRegistryDateNewRow.getDate()).slice(-2)}-${("0" + (dataSentOnRegistryDateNewRow.getMonth() + 1)).slice(-2)}-${dataSentOnRegistryDateNewRow.getFullYear()} `
                let requestToDateNewRow = new Date(newRow.requestToDate);
                let requestToDateNewRowStr = `${("0" + requestToDateNewRow.getDate()).slice(-2)}-${("0" + (requestToDateNewRow.getMonth() + 1)).slice(-2)}-${requestToDateNewRow.getFullYear()} `

                let change = `обновлена строка: ${oldRow.whoSentCUSP} ${newRow.whoSentCUSP} ` +
                    `${whoSentDateOldRowStr} ${whoSentDateNewRowStr} `+
                    `${oldRow.whereSent} ${newRow.whereSent} ` +
                    `${oldRow.couponNum} ${newRow.couponNum} ` +
                    `${oldRow.letterSent} ${newRow.letterSent} ` +
                    `${letterSentDateOldRowStr} ${letterSentDateNewRowStr} ` +
                    `${oldRow.dataSentOnRegistryNum} ${newRow.dataSentOnRegistryNum} ` +
                    `${dataSentOnRegistryDateOldRowStr} ${dataSentOnRegistryDateNewRowStr} ` +
                    `${oldRow.requestToNum} ${newRow.requestToNum} ` +
                    `${requestToDateOldRowStr} ${requestToDateNewRowStr} `;

                let sql = "INSERT INTO `changes` (`change`, `changesOwner`, `changeData`) VALUES (?, ?, ?)";
                connection.query(sql,
                    [change, oldRow.owner , new Date()],
                    (err) => {
                        if (err)
                            return callback(new Error('Ошибка при сохранении изменения обновления'));
                        callback(null, oldRow.owner, result);
                    });
            },


            function (owner, result, callback) {
                updateData(owner);
                callback(null,result);
            },

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