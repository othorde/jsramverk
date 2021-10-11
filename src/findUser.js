var ObjectId = require('mongodb').ObjectId; 
const database = require("../db/database.js");
const auth = require("./auth");

"use strict";


const findUser = {
    findUser: async function (req, res) {
        let db;
        let checkAuth;

        try {
            
            db = await database.getDb();
            const result = await db.collection.findOne({"email": req.body.email})
            if (result == null) {
                return false;
            } else {

                let correctPsw = await auth.unhash(result.psw, req.body.psw);
                if (correctPsw) {

                    const token = await auth.token(req)
                    const res = {
                        token: token,
                        validate: true
                    }
                    return res
                }              
            }
            } catch (e) {
                if (e instanceof TypeError) {
                    return "Id not found, maybe a typeError?"
                }
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/",
                        title: "Database error",
                        detail: e.message
                    }
                });
            } finally {
            await db.client.close();
          }
        }
    }

module.exports = findUser;
