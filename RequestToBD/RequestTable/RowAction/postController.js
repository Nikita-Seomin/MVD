const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");


class reqTableController {
    async addRow(req, res) {

        const {
            userName,
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


            //------------------------------INSERTS IF NOT EXISTS----------------------------

            //add CUSP
            function (idUser, callback) {

                let sql = "INSERT INTO CUSP (CUSP)" +
                    "SELECT ? FROM DUAL " +
                    "WHERE NOT EXISTS (SELECT * FROM CUSP " +
                    "WHERE CUSP=? LIMIT 1)";

                connection.query(sql,
                    [whoSentCUSP, whoSentCUSP],
                    (err, results) => {
                    if (err)
                        return callback(new Error('INSERT CUSP error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null,idUser);
                });
            },

            //add Region
            function (idUser, callback) {

                let sql = "INSERT INTO Region (region)" +
                    "SELECT ? FROM DUAL " +
                    "WHERE NOT EXISTS (SELECT * FROM Region " +
                    "WHERE region=? LIMIT 1)";

                connection.query(sql,[region, region],(err, results) => {
                    if (err)
                        return callback(new Error('REPLACE Region error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null, idUser);
                });
            },

            //add Division where material sent
            function (idUser, callback) {

                let sql = "INSERT INTO DivisionWhereMaterialSent (title)" +
                    "SELECT ? FROM DUAL " +
                    "WHERE NOT EXISTS (SELECT * FROM DivisionWhereMaterialSent " +
                    "WHERE title=? LIMIT 1)";

                connection.query(sql,
                    [whereSent, whereSent],
                    (err, results) => {
                    if (err)
                        return callback(new Error('REPLACE DivisionWhereMaterialSent error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null, idUser);
                });
            },

            //------------------------------------------------------------------------------------------------------


            //search who and when sent
            function (idUser, callback) {
                let sql = "SELECT CUSP FROM CUSP WHERE CUSP=?";
                connection.query(sql,
                    [whoSentCUSP],
                    (err, results) => {
                    if (err)
                        return callback(new Error('SEARCH CUSP error'));
                    if (results.length === 0)
                        return callback(new Error(''))
                    callback(null, idUser, results[0]["CUSP"]);
                });
            },

            //search region
            function (idUser,CUSP, callback) {
                let sql = "SELECT idRegion FROM Region WHERE region=? ";
                connection.query(sql,
                    [region],
                    (err, results) => {
                        if (err)
                            return callback(new Error('SEARCH Region error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,idUser, CUSP, results[0]["idRegion"]);
                    });
            },

            //search Division Where Material Sent
            function (idUser,CUSP, idRegion, callback) {
                let sql = "SELECT idDivisionWhereMaterialSent FROM DivisionWhereMaterialSent WHERE title=? ";
                connection.query(sql,
                    [whereSent],
                    (err, results) => {
                        if (err)
                            return callback(new Error('SEARCH DivisionWhereMaterialSent error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,idUser,CUSP, idRegion, results[0]["idDivisionWhereMaterialSent"]);
                    });
            },


            //-----------------------------------------------------------------------------------------------


            //add request table
            function (idUser,
                      CUSP,
                      idRegion,
                      idDivisionWhereMaterialSent,
                      callback
            ) {

                let sql = "INSERT INTO RequestTable " +
                    "(" +
                    "whoSentCUSP, WhoSentCUSPDate, region, " +
                    "whereSent, couponNum, letterSent, letterSentDate, dataSentOnRegistryNum, " +
                    "dataSentOnRegistryDate, requestToNum, requestToDate, answerOnRequest, owner" +
                    ")" +
                    "SELECT ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ? FROM DUAL " +
                    "WHERE NOT EXISTS " +
                    "(SELECT * FROM RequestTable WHERE " +
                    "whoSentCUSP=? AND WhoSentCUSPDate=? AND region=? AND whereSent=? AND couponNum=? " +
                    "AND letterSent=? AND letterSentDate=? AND dataSentOnRegistryNum=? AND dataSentOnRegistryDate=? " +
                    "AND requestToNum=? AND requestToDate=? AND answerOnRequest=? AND owner=? " +
                    "LIMIT 1)";

                connection.query(sql,
                    [

                        CUSP,
                        WhoSentCUSPDate,
                        idRegion,
                        idDivisionWhereMaterialSent,
                        couponNum,
                        letterSent, letterSentDate,
                        dataSentOnRegistryNum, dataSentOnRegistryDate,
                        requestToNum, requestToDate,
                        answerOnRequest,
                        idUser,

                        CUSP,
                        WhoSentCUSPDate,
                        idRegion,
                        idDivisionWhereMaterialSent,
                        couponNum,
                        letterSent, letterSentDate,
                        dataSentOnRegistryNum, dataSentOnRegistryDate,
                        requestToNum, requestToDate,
                        answerOnRequest,
                        idUser,
                    ],
                    (err, results) => {
                        if (err)
                            return callback(new Error('INSERT to Request Table error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null, idUser, CUSP, idRegion, idDivisionWhereMaterialSent);
                    });
            },

            //add changes
            function (idUser,
                      CUSP,
                      idRegion,
                      idDivisionWhereMaterialSent,
                      callback
            ) {

                let change = `добовлена строка: ${CUSP} ${WhoSentCUSPDate} ${region} ${whereSent} ${couponNum} ` +
                    `${letterSent} ${letterSentDate} ${dataSentOnRegistryNum} ${dataSentOnRegistryDate} ` +
                    `${requestToNum} ${requestToDate}`;

                let sql = "INSERT INTO `changes` (`change`, `changesOwner`, `changeData`) VALUES (?, ?, ?)";

                connection.query(sql,
                    [change, idUser, new Date()],
                    (err, results) => {
                        if (err)
                            return callback(new Error(''));
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