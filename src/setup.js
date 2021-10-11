/**
 * Connect to the database and setup it with some default data.
 * Används enbart för att återställa db
 */
 "use strict";
const database = require("../db/database.js");

//const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";



const fs = require("fs");
const path = require("path");
const docs = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "setup.json"),
    "utf8"
));
 
 

 // Do it.
resetCollection( "crowd", docs)
    .catch(err => console.log(err));
 

 /**
  * Reset a collection by removing existing content and insert a default
  * set of documents.
  *
  * @async
  *
  * @param {string} dsn     DSN to connect to database.
  * @param {string} colName Name of collection.
  * @param {string} doc     Documents to be inserted into collection.
  *
  * @throws Error when database operation fails.
  *
  * @return {Promise<void>} Void
  */
async function resetCollection(colName, doc) {

    let db = await database.getDb();
    let col = db.collection;
    let client = db.client;


    await col.deleteMany();
    await col.insertMany(doc);

    await client.close();
}
 