'use strict'

const bd = require("./../../Database");
const {response} = require("express");
const app = require("./../../server");

app.post("/WhoAndWhenSendTablePost", (req, res) => {

    res.redirect("/");
});

exports.add = (req, res) => {
    const sql = "INSERT INTO `WhoAndWhenSend`(`CUSPNum`, `date`) VALUES('" + req.query.CUSP + "', '" + req.query.date + "') ";
    bd.query(sql, (err, results) => {
        if(err) {
            console.log("add error to WhoAndWhenSend");
            console.log(err);
        } else {
            response.status(results, res);
        }
    })
}
