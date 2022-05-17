const mysql = require("mysql2");
const {dbConfig} = require("../../Settings");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const {config} = require("./../../Settings")

class authController {
    async login(req, res) {
        try {
            let h = bcrypt.hashSync('root', config.sold);
            res.send(h);


        } catch (e) {
            console.log("authController : login Error");
            console.log(e);
        }
    }
}

module.exports = new authController();