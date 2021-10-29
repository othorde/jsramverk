"use strict";

const database = require("../db/database.js");



const findAuthDoc = {

    findAuthDocs: async function (req) {
        let db;
        const user = req.body.user;
        const options  = {
            projection: { "docs.docname": 1, "docs.docid": 1, "docs.text": 1 }
        }
        const query = { "docs.allowed_user": user }
        try {
            db = await database.getDb();
            const res = await db.collection.find(query, options).toArray();
            if (res) {
                return res;
            } else {
                return false;
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

module.exports = findAuthDoc;
