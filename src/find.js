var ObjectId = require('mongodb').ObjectId; 
const database = require("../db/database.js");

"use strict";


const find = {
    findDocument: async function (critera, projection, limit) {
        let db;

        try {

            db = await database.getDb();
            var id = "613786be89d20818d0b0726f";

            res = await db.collection.find({"_id": ObjectId(id) }, projection).limit(limit).toArray();

            if (res) {
                return res;
            }
            } catch (e) {
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

module.exports = find;
