/**
 * Connect to the database and setup it with some default data.
 */
"use strict";
const database = require("../db/database.js");
const mailAvaliable = require("./mailavaliable");
const auth = require("./auth");
const { isMailAvaliable } = require("./mailavaliable");

const create = {
    createUser: async function (req, res) {
        let user;
        let db;
        let salt = 10;
        let hashed;
        let isAvaliable;
        try {
            user = req.body;
            db = await database.getDb();

            if (user.email.length >= 5 && user.psw.length >= 5 && user.email.includes("@"))
                {
                    hashed = await auth.hash(user.psw, salt)
                    isAvaliable = await mailAvaliable.isMailAvaliable(req.body.email)
                    if (isAvaliable == true && hashed) {
                        user.psw = hashed;
                        let result = await db.collection.insertOne(user);
                        if (result) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                } else {
                    return false
                } 
        } catch (e) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        path: "/data",
                        title: "Database error",
                        message: e.message
                    }
                });
            } finally {
                await db.client.close();
        }
    },
}

module.exports = create;
