const database = require("../db/database.js");
const auth = require("./auth.js");

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
