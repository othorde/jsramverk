const database = require("../db/database.js");
const auth = require("./auth.js");
"use strict";

const findAll = {

    findAllDoc: async function (criteria, projection, limit) {
        let db;
        try {
            db = await database.getDb();
            const res = await db.collection.find(criteria, projection).limit(limit).toArray();
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
    },
}

module.exports = findAll;
