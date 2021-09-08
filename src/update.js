/**
 * Connect to the database and setup it with some default data.
 */
 "use strict";
const ObjectId = require('mongodb').ObjectId; 
const database = require("../db/database.js");



const update = {
    
    updateDocument: async function (req, res) {
        // req contains user object set in checkToken middleware
        let db;
        console.log('Got name:', req.body);

        try {
            db = await database.getDb();
            var id = req.body._id;
            const filter = { "_id": ObjectId(id) };
            //res = await db.collection.find({"_id": ObjectId(id) }, projection).limit(limit).toArray();

            const updateDocument = {
                $set: {
                    name: req.body.name,
                    body: req.body.body
                },
            };

            const res = await db.collection.updateOne(
                filter,
                updateDocument,
            );
            if (res) {
                return res;
            }
        } catch (e) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    path: "/",
                    title: "Database error",
                    message: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    },
}

module.exports = update;
