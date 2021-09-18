/**
 * Connect to the database and setup it with some default data.
 */
 "use strict";
const database = require("../db/database.js");
var express = require('express');
var ObjectId = require('mongodb').ObjectId; 


const create = {
    createDocument: async function (req, res) {
        let doc;
        let db;
        try {
            db = await database.getDb(); 
            
            doc = { /* uppbyggnad av dokumentet */
                name: req.body.name, //body.name,
                body: req.body.body, //body.text
            };

            if (req.body._id) {
                doc = { /* uppbyggnad av dokumentet */
                    _id: req.body._id,
                    name: req.body.name, //body.name,
                    body: req.body.body, //body.text
                };
            } 

          
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
