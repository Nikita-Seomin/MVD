const mysql = require("mysql2");
const {dbConfig} = require("../../../Settings");
const async = require("async");
const updateData = require("./auxiliaryFunctions/updateDataInChanges");


class reqTableController {
    addRow(req, res) {
        console.log(req.body)
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
                let sql = "SELECT idUsers FROM Users WHERE UserName= ? LIMIT 1";
                connection.query(sql, [userName], (err, results) => {
                    if (err)
                        return callback(new Error('SELECT error when you take user ID'));
                    else if (results.length === 0 )
                        return callback(new Error("Не найден id у этого пользователя"));
                    callback(null, results[0]["idUsers"]);
                });
            },

            //search region
            function (idUser, callback) {
                let sql = "SELECT idRegion FROM Region WHERE region=? LIMIT 1";
                connection.query(sql,
                    [region],
                    (err, results) => {
                        if (err)
                            return callback(new Error('SEARCH Region error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,idUser, results[0]["idRegion"]);
                    });
            },

            //search Division Where Material Sent
            function (idUser, idRegion, callback) {
                let sql = "SELECT idUsers FROM Users WHERE UserName=? LIMIT 1";
                connection.query(sql,
                    [whereSent],
                    (err, results) => {
                        if (err)
                            return callback(new Error('SEARCH DivisionWhereMaterialSent error'));
                        if (results.length === 0)
                            return callback(new Error(''))
                        callback(null,idUser, idRegion, results[0]["idUsers"]);
                    });
            },


            //-----------------------------------------------------------------------------------------------


            //add request table
            function (idUser,
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

                        whoSentCUSP,
                        WhoSentCUSPDate,
                        idRegion,
                        idDivisionWhereMaterialSent,
                        couponNum,
                        letterSent, letterSentDate,
                        dataSentOnRegistryNum, dataSentOnRegistryDate,
                        requestToNum, requestToDate,
                        answerOnRequest,
                        idUser,

                        whoSentCUSP,
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
                        callback(null, idUser, idRegion, idDivisionWhereMaterialSent);
                    });
            },

            //add changes
            function (idUser,
                      idRegion,
                      idDivisionWhereMaterialSent,
                      callback
            ) {

                let change = `добовлена строка: ${whoSentCUSP} ${WhoSentCUSPDate} ${region} ${whereSent} ${couponNum} ` +
                    `${letterSent} ${letterSentDate} ${dataSentOnRegistryNum} ${dataSentOnRegistryDate} ` +
                    `${requestToNum} ${requestToDate}`;

                let sql = "INSERT INTO `changes` (`change`, `changesOwner`, `changeData`) VALUES (?, ?, ?)";

                connection.query(sql,
                    [change, idUser, new Date()],
                    (err, results) => {
                        if (err)
                            return callback(new Error(''));
                        callback(null, idUser, results);
                    });
            },

            function (idUser, results, callback) {
                updateData(idUser);
                callback(null,results);
            },



        ], function (err,result) {
            connection.end();
            if (err) {
                res.send(err.message);
            }
            console.log(result)
            res.send(result);
        });

    }
}
module.exports = new reqTableController();