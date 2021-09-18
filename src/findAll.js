const database = require("../db/database.js");
var ObjectId = require('mongodb').ObjectId; 

 "use strict";

/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */

const findAll = {

    findAllDoc: async function (criteria, projection, limit) {

        let db;
        try {
            db = await database.getDb();

            //db.theColl.find( { "_id": ObjectId("4ecbe7f9e8c1c9092c000027") } )


            const res = await db.collection.find(criteria, projection).limit(limit).toArray();
            console.log(res)
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

module.exports = findAll;
