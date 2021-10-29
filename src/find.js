var ObjectId = require('mongodb').ObjectId; 
const database = require("../db/database.js");

"use strict";


const find = {
    findDocument: async function (id, res) {
        let db;

        try {
            db = await database.getDb();   
            const result = await db.collection.aggregate([
            {$match: {'docs.docid': {$in : [id] } }},
            {$project: {
                docs: {$filter: {
                    input: '$docs',
                    as: 'docid',
                    cond: {$in: ['$$docid.docid', [id]]}
                }}
            }}
            ]).toArray();
            if (result !== undefined) {
                return result;
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

module.exports = find;
