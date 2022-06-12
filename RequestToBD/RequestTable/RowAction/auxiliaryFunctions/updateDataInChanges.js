const mysql = require("mysql2");
const {dbConfig} = require("../../../../Settings");
const async = require("async");


let NUMBER_LAST_CHANGES_NEED = 15; // how many logs you have a need for user in IU

let updateData = (owner) => {

    const connection = mysql.createConnection(dbConfig);        // connection with bd

    async.waterfall([                                              //request to bd one by one

        //select row on id (save results for update changes table)
        function (callback) {
            let sql = "SELECT * FROM changes WHERE changesOwner=?";
            connection.query(sql, [owner], (err, results) => {
                if (err)
                    return callback(new Error('Ошибка поиска последних обновлений'));
                callback(null, results);
            });
        },

        //delete row on id
        function (changes, callback) {
        if (changes.length === NUMBER_LAST_CHANGES_NEED+1){
            let sql = "DELETE FROM changes WHERE changesOwner=? LIMIT 1";
            connection.query(sql, [owner], (err) => {
                if (err)
                    return callback(new Error('Ошибка при удалении строки'));
                callback(null);
            });
        }
            callback(null);
        },

    ], function (err) {
        connection.end();
        if (err) {
            return(err.message);
        }
        return 0;
    });

}


module.exports = updateData;