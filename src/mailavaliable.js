var ObjectId = require('mongodb').ObjectId; 
const database = require("../db/database.js");

"use strict";

const mailAvaliable = {
    isMailAvaliable: async function (email) {
        let db;

        try {

            db = await database.getDb(); 
            let result = await db.collection.find({"email": email}).toArray();
            if (result.length === 0) { /* om result är empty */
                return true
            } else {
                return false
            }
            } catch (e) {
                if (e instanceof TypeError) {
                    return false
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

module.exports = mailAvaliable;
