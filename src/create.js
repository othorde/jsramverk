/**
 * Connect to the database and setup it with some default data.
 */
 "use strict";
const database = require("../db/database.js");
var express = require('express');


const create = {
    createDocument: async function (req, res) {
        
        let db;
        try {
            db = await database.getDb();         
            const doc = { /* uppbyggnad av dokumentet */
                name: req.body.name, //body.name,
                body: req.body.body, //body.text
            };
            if (doc.name !== undefined) {
                const res = await db.collection.insertOne(doc);
                return true
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
