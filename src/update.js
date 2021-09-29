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
        console.log("updateDocument", req.body)
        try {
            /* if (req.body._id !== String ) {
                console.log("updateDocumentafterIF", req.body)

                return "false";
            } */
            
            db = await database.getDb();
            var id = req.body._id;
            const filter = { "_id": ObjectId(id) };

            const updateDocument = {
                $set: {
                    body: req.body.body
                },
            };

            const result = await db.collection.updateOne(
                filter,
                updateDocument,
            );
           /*      console.log("HHHHHÄR", result)
            if (result.acknowledged) {
                return result
            } else {
                return false
            }  */
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
