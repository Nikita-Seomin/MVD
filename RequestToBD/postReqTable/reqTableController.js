const mysql = require("mysql2");
const {dbConfig} = require("../../Settings");
const async = require("async");


class reqTableController {
    async reqAdd(req, res) {

        const {
            userName,
            CUSPNum, CUSPDate,
            Region,
            couponNum,
            DivisionWhereMaterialSent,
            letNumber, letNumberDate,
            registryNum, registryNumDate,
            divisionNum, divisionNumDate,
            answerOnRequest
        } = req.body;
        const connection = mysql.createConnection(dbConfig);
        async.waterfall([

            //take user ID
            function (callback) {
                let sql = "SELECT idUsers FROM Users WHERE UserName= ?";
                connection.query(sql, [userName], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you take user ID'));
                    else if (results.length === 0 )
                        return callback(new Error("Не найден id у этого пользователя"));
                    callback(null, results[0]["idUsers"]);
                });
            },

            //search id request path
            function (id, callback) {
                let sql = "SELECT idTableInfo FROM tableInfo WHERE dataOwner='"+ id + "' ";
                connection.query(sql,(err, results) => {
                    if (err)
                        return callback(new Error('ELECT error when you search id request path'));
                    else if (results.length === 0 )
                        return callback(new Error("Не найдена таблица запросов у этого пользователя"));
                    callback(null,results[0]["idTableInfo"]);
                });
            },


            //------------------------------INSERTS IF NOT EXISTS----------------------------

            //add CUSP
            function (idTableInfo, callback) {

                let sql = "INSERT INTO WhoAndWhenSend (CUSPNum, date)" +
                    "SELECT ?, ? FROM DUAL " +
                    "WHERE NOT EXISTS (SELECT * FROM WhoAndWhenSend " +
                    "WHERE CUSPNum=? AND date=? LIMIT 1)";

                connection.query(sql,
                    [CUSPNum, CUSPDate,CUSPNum, CUSPDate],
                    (err, results) => {
                    if (err)
                        return callback(new Error('REPLACE CUSP error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null,idTableInfo);
                });
            },

            //add Region
            function (idTableInfo, callback) {

                let sql = "INSERT INTO Region (region)" +
                    "SELECT ? FROM DUAL " +
                    "WHERE NOT EXISTS (SELECT * FROM Region " +
                    "WHERE region=? LIMIT 1)";

                connection.query(sql,[Region, Region],(err, results) => {
                    if (err)
                        return callback(new Error('REPLACE Region error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null, idTableInfo);
                });
            },

            //add Division where material sent
            function (idTableInfo, callback) {

                let sql = "INSERT INTO DivisionWhereMaterialSent (title)" +
                    "SELECT ? FROM DUAL " +
                    "WHERE NOT EXISTS (SELECT * FROM DivisionWhereMaterialSent " +
                    "WHERE title=? LIMIT 1)";

                connection.query(sql,
                    [DivisionWhereMaterialSent, DivisionWhereMaterialSent],
                    (err, results) => {
                    if (err)
                        return callback(new Error('REPLACE DivisionWhereMaterialSent error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null, idTableInfo);
                });
            },

            //add letter with response
                function (idTableInfo, callback) {

                    let sql = "INSERT INTO letterWithRequest (letNumber, date)" +
                        "SELECT ?, ? FROM DUAL " +
                        "WHERE NOT EXISTS (SELECT * FROM letterWithRequest " +
                        "WHERE letNumber=? AND date=? LIMIT 1)";

                    connection.query(sql,
                        [letNumber, letNumberDate, letNumber, letNumberDate],
                        (err, results) => {
                    if (err)
                        return callback(new Error('REPLACE letterWithRequest error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null, idTableInfo);
                });
            },

            //add Send Data On Registry Division
            function (idTableInfo, callback) {

                let sql = "INSERT INTO SendDataOnRegistryDivision (registryNum, date)" +
                    "SELECT ?, ? FROM DUAL " +
                    "WHERE NOT EXISTS (SELECT * FROM SendDataOnRegistryDivision " +
                    "WHERE registryNum=? AND date=? LIMIT 1)";

                connection.query(sql,
                    [registryNum, registryNumDate, registryNum, registryNumDate],
                    (err, results) => {
                    if (err)
                        return callback(new Error('REPLACE SendDataOnRegistryDivision error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null, idTableInfo);
                });
            },

            //add Request To
            function (idTableInfo, callback) {

                let sql = "INSERT INTO RequestTo (divisionNum, date)" +
                    "SELECT ?, ? FROM DUAL " +
                    "WHERE NOT EXISTS (SELECT * FROM RequestTo " +
                    "WHERE divisionNum=? AND date=? LIMIT 1)";

                connection.query(sql,
                    [divisionNum, divisionNumDate, divisionNum, divisionNumDate],
                    (err, results) => {
                    if (err)
                        return callback(new Error('REPLACE RequestTo error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null, idTableInfo);
                });
            },


            //------------------------------------------------------------------------------------------------------


            //search who and when sent
            function (idTableInfo, callback) {
                let sql = "SELECT idWhoAndWhenSend FROM WhoAndWhenSend WHERE CUSPNum=? AND date=? ";
                connection.query(sql,
                    [CUSPNum, CUSPDate],
                    (err, results) => {
                    if (err)
                        return callback(new Error('SEARCH WhoAndWhenSend error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null, idTableInfo, results[0]["idWhoAndWhenSend"]);
                });
            },

            //search region
            function (idTableInfo,idWhoAndWhenSend, callback) {
                let sql = "SELECT idRegion FROM Region WHERE region=? ";
                connection.query(sql,
                    [Region],
                    (err, results) => {
                        if (err)
                            return callback(new Error('SEARCH Region error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,idTableInfo, idWhoAndWhenSend, results[0]["idRegion"]);
                    });
            },

            //search Division Where Material Sent
            function (idTableInfo,idWhoAndWhenSend, idRegion, callback) {
                let sql = "SELECT idDivisionWhereMaterialSent FROM DivisionWhereMaterialSent WHERE title=? ";
                connection.query(sql,
                    [DivisionWhereMaterialSent],
                    (err, results) => {
                        if (err)
                            return callback(new Error('SEARCH DivisionWhereMaterialSent error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,idTableInfo,idWhoAndWhenSend, idRegion, results[0]["idDivisionWhereMaterialSent"]);
                    });
            },

            //search letter With Request
            function (idTableInfo,idWhoAndWhenSend, idRegion, idDivisionWhereMaterialSent, callback) {
                let sql = "SELECT idletterWithRequest FROM letterWithRequest WHERE letNumber=? AND date=? ";
                connection.query(sql,
                    [letNumber, letNumberDate],
                    (err, results) => {
                        if (err)
                            return callback(new Error('SEARCH letterWithRequest error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,idTableInfo,idWhoAndWhenSend, idRegion, idDivisionWhereMaterialSent, results[0]["idletterWithRequest"]);
                    });
            },

            //search Send Data On Registry Division
            function (idTableInfo,idWhoAndWhenSend, idRegion, idDivisionWhereMaterialSent, idLetterWithRequest, callback) {
                let sql = "SELECT idSendDataOnRegistryDivision FROM SendDataOnRegistryDivision WHERE registryNum=? AND date=? ";
                connection.query(sql,
                    [registryNum, registryNumDate],
                    (err, results) => {
                        if (err)
                            return callback(new Error('SEARCH SendDataOnRegistryDivision error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,idTableInfo,idWhoAndWhenSend, idRegion, idDivisionWhereMaterialSent, idLetterWithRequest, results[0]["idSendDataOnRegistryDivision"]);
                    });
            },

            //search Request To
            function (idTableInfo,idWhoAndWhenSend, idRegion, idDivisionWhereMaterialSent, idLetterWithRequest, idSendDataOnRegistryDivision, callback) {
                let sql = "SELECT idRequestTo FROM RequestTo WHERE divisionNum=? AND date=? ";
                connection.query(sql,
                    [divisionNum, divisionNumDate],
                    (err, results) => {
                        if (err)
                            return callback(new Error('SEARCH RequestTo error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,idTableInfo,idWhoAndWhenSend,idRegion, idDivisionWhereMaterialSent, idLetterWithRequest, idSendDataOnRegistryDivision, results[0]["idRequestTo"]);
                    });
            },



            //search Request To
            function (idTableInfo,
                      idWhoAndWhenSend,
                      idRegion,
                      idDivisionWhereMaterialSent,
                      idLetterWithRequest,
                      idSendDataOnRegistryDivision,
                      idRequestTo,
                      callback
            ) {

                let sql = "INSERT INTO RequestTable (who, region, whereSent, couponNum, letter, dataOnRegistry, requestTo, answerOnRequest, owner)" +
                    "SELECT ?, ?, ? ,?, ?, ?, ?, ?, ? FROM DUAL " +
                    "WHERE NOT EXISTS (SELECT * FROM RequestTable " +
                    "WHERE who=? AND region=? AND whereSent=? AND couponNum=? AND letter=? AND dataOnRegistry=? AND requestTo=? AND answerOnRequest=? AND owner=? LIMIT 1)";

                connection.query(sql,
                    [
                        idWhoAndWhenSend,
                        idRegion,
                        idDivisionWhereMaterialSent,
                        couponNum,
                        idLetterWithRequest,
                        idSendDataOnRegistryDivision,
                        idRequestTo,
                        answerOnRequest,
                        idTableInfo,

                        idWhoAndWhenSend,
                        idRegion,
                        idDivisionWhereMaterialSent,
                        couponNum,
                        idLetterWithRequest,
                        idSendDataOnRegistryDivision,
                        idRequestTo,
                        answerOnRequest,
                        idTableInfo
                    ],
                    (err, results) => {
                        if (err)
                            return callback(new Error('INSERT to Request Table error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,results);
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