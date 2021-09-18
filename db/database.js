"use strict";


const mongo = require("mongodb").MongoClient;
let collectionName = "crowd";
let config;
let password;
let username;

try {
    config = require("./config.json");
} catch (error) {
    console.log(error)
}

username =  config.username || process.env.USERNAME;
password =  config.password || process.env.PASSWORD;

const database = {
    getDb: async function getDb () {

        let dsn = `mongodb+srv://${username}:${password}@cluster0.gywby.mongodb.net/mumin?retryWrites=true&w=majority`;


        if (process.env.NODE_ENV === "test") {
            dsn = "mongodb://localhost:27017/mumin";

        } 

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    },

};

module.exports = database;
  /*   resetDb: async function reset() {


        const fs = require("fs");
        const path = require("path");
        const docs = JSON.parse(fs.readFileSync(
            path.resolve(__dirname, "../src/setup.json"),
            "utf8"
        ));
        
        

        // Do it.
        resetCollection( "crowd", docs)
            .catch(err => console.log(err));
        

        async function resetCollection(colName, doc) {

            let db = await database.getDb();
            let col = db.collection;
            let client = db.client;

            await col.deleteMany();
            await col.insertMany(doc);

            await client.close();
        }
        
    } */
